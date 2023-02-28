using Backend.Service.Consts;
using Backend.Service.Models.Product;

namespace Backend.Service.Models.Order
{
    public class OrderResponseModel : BaseModel<Entities.Order>
    {
        public double TotalPrice { get; set; }
        public string? Note { get; set; } = string.Empty;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public DateTime? CloseDate { get; set; }
        public DateTime? EstimatedReceiveDate { get; set; }
        public string? CancelReason { get; set; }
        public ICollection<OrderDetailRM> OrderDetails { get; set; }

        public SAddressRM CustomerInfo { get; set; }

        public OrderResponseModel(Entities.Order entity) : base(entity) 
        {
            TotalPrice = entity.TotalPrice;
            Note= entity.Note;
            Status = entity.Status;
            OrderDate = entity.OrderDate;
            CloseDate = entity.CloseDate;
            EstimatedReceiveDate = entity.EstimatedReceiveDate;
            OrderDetails = entity.OrderDetails.Select(od => new OrderDetailRM(od)).ToList();
            CustomerInfo = entity.ShippingAddress != null ? new SAddressRM(entity.ShippingAddress) : null;
            CancelReason = entity.CancelledReason;
        }
    }

    public class SAddressRM : BaseModel<Entities.ShippingAddress>
    {
        public string Email { get; set; }
        public string Fullname { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string? Ward { get; set; }
        public string? District { get; set; }
        public string? Province { get; set; }

        public SAddressRM(Entities.ShippingAddress entity) : base(entity)
        {
            Email = entity.Email;
            Fullname = entity.FullName;
            PhoneNumber = entity.PhoneNumber;
            Address = entity.Address;
            Ward = entity.Ward;
            District = entity.District;
            Province = entity.Province;
        }
    }

    public class OrderDetailRM : BaseModel<Entities.OrderDetail>
    {
        public int Quantity { get; set; }
        public double Price { get; set; }
        public ProductResponseModel Product { get; set; }

        public OrderDetailRM(Entities.OrderDetail entity) : base(entity)
        {
            Quantity = entity.Quantity;
            Price = entity.Price;
            Product = new ProductResponseModel(entity.Product);
        }
    }
}
