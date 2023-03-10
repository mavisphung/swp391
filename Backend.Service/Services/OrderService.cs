using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Extensions;
using Backend.Service.Helper;
using Backend.Service.Models.Email;
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
        private readonly ICategoryRepository _categoryRepository;
        private readonly EmailService _emailService;

        public OrderService(
            IOrderRepository orderRepository,
            IUserRepository userRepository,
            IShippingAddressRepository shippingAddressRepository,
            IProductRepository productRepository,
            ICategoryRepository categoryRepository,
            EmailService emailService)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _addressRepository = shippingAddressRepository;
            _productRepository = productRepository;
            _emailService = emailService;
            _categoryRepository = categoryRepository;
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
            IEnumerable<Category> categories = await _categoryRepository.GetAllAsync();
            // TODO: trừ số lượng sản phẩm trong product

            IEnumerable<OrderDetail> orderDetails = model.CartItems.Select(ci =>
            {
                var foundProd = products.Where(p => p.Id == ci.ProductId).First();
                var foundCate = categories.Where(c => c.Id == foundProd.CategoryId).First();
                foundProd.Category = foundCate;
                return new OrderDetail()
                {
                    ProductId = ci.ProductId.GetValueOrDefault(),
                    Product = foundProd,
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
            await _addressRepository.SaveDbChangeAsync();

            // Create MailData object
            EmailModel mailData = new EmailModel(
                new List<string> { newOrder.ShippingAddress.Email },
                "Welcome to the MailKit Demo",
                _emailService.GetEmailTemplate("OrderConfirmation/public/orderConfirm", newOrder));


            bool sendResult = await _emailService.SendAsync(mailData, new CancellationToken());

            if (!sendResult)
            {
                throw new BaseException(BaseError.INTERNAL_SERVER_ERROR);
            }

            // TODO: Thêm payment vào version sau

            return new OrderResponseModel(newOrder);
        }

        public async Task<Order> UpdateStatusAsync(int id, UpdateOrderStatusModel model)
        {
            User? staff = await _userRepository.GetUserByIdAsync(model.StaffAccountId);
            Order found = await GetOneAsync(id);
            found.Status = model.OrderStatus;
            found.UpdatedBy = staff!.Fullname;

            if (model.OrderStatus == OrderStatus.Accepted && model.EstimatedReceiveDate != null)
            {
                found.EstimatedReceiveDate = model.EstimatedReceiveDate.SetKindUtc();
            }

            if (model.OrderStatus == OrderStatus.Cancelled && !string.IsNullOrEmpty(model.Reason))
            {
                found.CancelledReason = model.Reason;
                found.CloseDate = DateTime.UtcNow;
            }

            if (model.OrderStatus == OrderStatus.Finished)
            {
                found.CloseDate = DateTime.UtcNow;
            }

            _orderRepository.Update(found);
            await _orderRepository.SaveDbChangeAsync();
            return found;
        }
    }
}
