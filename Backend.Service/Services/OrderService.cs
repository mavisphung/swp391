using System;
using System.Net;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Extensions;
using Backend.Service.Helper;
using Backend.Service.Models.Order;
using Backend.Service.Models.Product;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using LinqKit;

namespace Backend.Service.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly IShippingAddressRepository _addressRepository;
        private readonly IProductRepository _productRepository;
        private readonly IPaymentRepository _paymentRepository;

        public OrderService(
            IOrderRepository orderRepository,
            IUserRepository userRepository,
            IShippingAddressRepository shippingAddressRepository,
            IProductRepository productRepository,
            IPaymentRepository paymentRepository)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _addressRepository = shippingAddressRepository;
            _productRepository = productRepository;
            _paymentRepository = paymentRepository;
        }

        public async Task<PagedList<OrderResponseModel>> GetAllAsync(OrderFilterParameter filter)
        {
            var predicate = PredicateBuilder.New<Order>(o => !o.IsDeleted);
            if (filter.OrderStatus != null)
            {
                predicate = predicate.And(o => o.Status == filter.OrderStatus);
            }

            if (filter.From != null)
            {
                predicate = predicate.And(o => o.OrderDate >= filter.From.SetKindUtc());
            }

            if (filter.To != null)
            {
                predicate = predicate.And(o => o.OrderDate <= filter.To.SetKindUtc());
            }
            
            IEnumerable<Order> query = await _orderRepository.GetAllAsync(
                filter: predicate,
                orderBy: que => filter.Ascending == false
                                    ? que.OrderByDescending(order => order.OrderDate)
                                    : que.OrderBy(order => order.OrderDate),
                includeProperties: "ShippingAddress,OrderDetails,OrderDetails.Product,OrderDetails.Product.Category");
            // TODO: Sửa order theo Descending theo OrderDate - CHECKED
            return PagedList<OrderResponseModel>.ToPagedList(
                query.Select(entity => new OrderResponseModel(entity)).ToList(),
                filter.PageNumber,
                filter.PageSize);
        }

        public async Task<Order> GetOneAsync(int id)
        {
            var found = await _orderRepository.GetFirstOrDefaultAsync(
                o => !o.IsDeleted && o.Id == id,
                "ShippingAddress,OrderDetails,OrderDetails.Product,OrderDetails.Product.Category");
            if (found == null)
                throw new NotFoundException(BaseError.ORDER_NOT_FOUND.ToString());
            return found;
        }

        public async Task<OrderResponseModel> ProcessAddToCartUnauth(UnauthOrderRequestModel model)
        {
            // kiểm tra user đã tồn tại hay chưa
            // Đã check null nên không cần check ở tầng service nữa
            User? user = null;
            try
            {
                user = await _userRepository.GetUserByEmailAsync(model.Customer.Email);
            }
            catch
            {
                user = null;
            }
            Console.WriteLine($"user: {user}");


            // Tạo shipping address trước
            ShippingAddress? shippingAddress = null;
            try
            {
                shippingAddress = await _addressRepository.GetShippingAddressByEmailAsync(model.Customer.Email);
            }
            catch
            {
                // Chưa có address trong db thì tạo mới
                shippingAddress = new ShippingAddress()
                {
                    Email = model.Customer.Email,
                    Address = model.Customer.Address,
                    FullName = model.Customer.Fullname,
                    Ward = model.Customer.Ward,
                    District = model.Customer.District,
                    Province = model.Customer.Province,
                    PhoneNumber = model.Customer.PhoneNumber,
                };
                Console.WriteLine("Creating new address");
            }
            Console.WriteLine($"address: {shippingAddress}");

            // Tạo order từ cart
            Order newOrder = new Order()
            {
                Note = model.Note
            };

            // Tạo order details
            // Lấy sản phẩm
            IEnumerable<Product> products = await _productRepository.GetAllAsync(
                p => !p.IsDeleted 
                    && model.CartItems.Select(ci => ci.ProductId).Contains(p.Id));
            products = products.ToList(); //cached

            // TODO: trừ số lượng sản phẩm trong product
            // Kiểm tra xem tất cả product có cái nào có quantity <= 0 không
            bool isInsufficientQuantity = products.Where(product => product.Quantity <= 0).Any();
            if (isInsufficientQuantity)
            {
                throw new BaseException(
                    errorMessage: BaseError.INSUFFICIENT_QUANTITY.ToString(),
                    statusCode: StatusCodes.Status409Conflict,
                    httpStatus: HttpStatusCode.Conflict
                );
            }
            IEnumerable<OrderDetail> orderDetails = model.CartItems.Select(ci =>
            {
                var foundProd = products.Where(p => p.Id == ci.ProductId).First();
                return new OrderDetail()
                {
                    ProductId = ci.ProductId.GetValueOrDefault(),
                    Quantity = ci.Quantity.GetValueOrDefault(),
                    Price = ci.Quantity.GetValueOrDefault() * foundProd.Price,
                };
            });
            newOrder.OrderDetails = orderDetails.ToList();
            newOrder.TotalPrice = orderDetails.Sum(p => p.Price);

            shippingAddress.Orders.Add(newOrder);
            if (shippingAddress.Id == 0)
            {
                // tạo mới shipping address
                await _addressRepository.AddAsync(shippingAddress);
            }
            else
            {
                // Cập nhật order vào shipping address
                _addressRepository.Update(shippingAddress);
            }
            if (user != null)
                shippingAddress.Receiver = user;

            await _addressRepository.SaveDbChangeAsync(); // Cập nhật hoặc thêm mới địa chỉ ship
            //await _productRepository.SaveDbChangeAsync(); // Cập nhật lại số lượng sản phẩm

            // TODO: Thêm payment vào version sau
            // Nếu user tồn tại thì gán payment này cho user, không thì gán cho shipping address
            Payment payment = new Payment
            {
                Amount = (int)newOrder.TotalPrice, // TODO: Sua Amount trong payment thanh int
                IsSuccess = true,
                PaymentMethod = model.PaymentMethod,
            };

            if (newOrder.Payments == null)
            {
                newOrder.Payments = new List<Payment>();
            }
            newOrder.Payments.Add(payment);
            _orderRepository.Update(newOrder);
            await _orderRepository.SaveDbChangeAsync();

            return new OrderResponseModel(newOrder);
        }

        private async Task<Order> _acceptOrder(Order order, UpdateOrderStatusModel model)
        {
            if (order.Status == OrderStatus.Accepted)
            {
                throw new BaseException(
                    errorMessage: BaseError.CONFLICT_DATA.ToString(),
                    statusCode: (int)HttpStatusCode.Conflict,
                    httpStatus: HttpStatusCode.Conflict);
            }
            // Lấy danh sách sản phẩm nằm bên trong order
            var prodIds = order.OrderDetails.Select(od => od.ProductId).ToList();
            var products = await _productRepository.GetAllAsync(
                prod => prodIds.Contains(prod.Id));
            products = products.ToList(); // cached

            // Trừ sản phẩm trong products
            foreach (var od in order.OrderDetails)
            {
                var foundProduct = products.Where(prod => prod.Id == od.ProductId).FirstOrDefault();
                foundProduct!.Quantity -= od.Quantity;
                _productRepository.Update(foundProduct);
            }
            order.Status = OrderStatus.Accepted;
            order.EstimatedReceiveDate = model.EstimatedReceiveDate.SetKindUtc();
            _orderRepository.Update(order);

            //await _orderRepository.SaveDbChangeAsync();
            // TODO: Gửi email sau khi admin chấp nhận đơn hàng
            return order;
        }

        private async Task<Order> _cancelOrder(Order order, UpdateOrderStatusModel model)
        {
            if (order.Status == OrderStatus.Cancelled)
            {
                throw new BaseException(
                    errorMessage: BaseError.CONFLICT_DATA.ToString(),
                    statusCode: (int)HttpStatusCode.Conflict,
                    httpStatus: HttpStatusCode.Conflict);
            }
            order.CancelledReason = model.Reason;
            order.CloseDate = DateTime.UtcNow;
            return order;
        }

        private async Task<Order> _finishOrder(Order order, UpdateOrderStatusModel model)
        {
            if (order.Status == OrderStatus.Finished)
            {
                throw new BaseException(
                    errorMessage: BaseError.CONFLICT_DATA.ToString(),
                    statusCode: (int)HttpStatusCode.Conflict,
                    httpStatus: HttpStatusCode.Conflict);
            }
            order.CloseDate = DateTime.UtcNow;
            return order;
        }

        public async Task<Order> UpdateStatusAsync(int id, UpdateOrderStatusModel model)
        {
            User? staff = await _userRepository.GetUserByIdAsync(model.StaffAccountId);
            Order found = await GetOneAsync(id);
            found.UpdatedBy = staff!.Fullname;

            // Khi admin nhấn nút chấp thuận
            if (model.OrderStatus == OrderStatus.Accepted && model.EstimatedReceiveDate != null)
            {
                found = await _acceptOrder(found, model);
            }

            // Khi admin nhấn nút hủy
            if (model.OrderStatus == OrderStatus.Cancelled)
            {
                found = await _cancelOrder(found, model);
            }

            // Khi admin nhấn nút kết thúc
            if (model.OrderStatus == OrderStatus.Finished)
            {
                found = await _finishOrder(found, model);
            }

            _orderRepository.Update(found);
            await _orderRepository.SaveDbChangeAsync();
            return found;
        }

        internal dynamic GetStatisticAsync()
        {
            var query = _orderRepository.GetDbSet().GroupBy(ord => ord.CreatedDate.Date)
                .Select(g => new { CreatedDate = g.Key, Orders = g.Count() })
                .OrderBy(g => g.CreatedDate)
                .ToList();
            return query;
        }
    }
}
