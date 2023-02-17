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

        public OrderService(
            IOrderRepository orderRepository,
            IUserRepository userRepository,
            IShippingAddressRepository shippingAddressRepository,
            IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _addressRepository = shippingAddressRepository;
            _productRepository = productRepository;
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
                includeProperties: "ShippingAddress,OrderDetails,OrderDetails.Product");

            return PagedList<OrderResponseModel>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id).Select(entity => new OrderResponseModel(entity)),
                filter.PageNumber,
                filter.PageSize);
        }

        public async Task<Order> GetOneAsync(int id)
        {
            var found = await _orderRepository.GetFirstOrDefaultAsync(
                o => !o.IsDeleted && o.Id == id,
                "ShippingAddress,OrderDetails,OrderDetails.Product");
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
            await _addressRepository.SaveDbChangeAsync();

            // TODO: Thêm payment vào version sau

            return new OrderResponseModel(newOrder);
        }

        public async Task<Order> UpdateStatusAsync(int id, OrderStatus status)
        {
            Order found = await GetOneAsync(id);
            found.Status = status;
            _orderRepository.Update(found);
            await _orderRepository.SaveDbChangeAsync();
            return found;
        }
    }
}
