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
        public ICollection<OrderDetailRM> OrderDetails { get; set; }

        public OrderResponseModel(Entities.Order entity) : base(entity) 
        {
            TotalPrice = entity.TotalPrice;
            Note= entity.Note;
            Status = entity.Status;
            OrderDate = entity.OrderDate;
            CloseDate = entity.CloseDate;
            EstimatedReceiveDate = entity.EstimatedReceiveDate;
            OrderDetails = entity.OrderDetails.Select(od => new OrderDetailRM(od)).ToList();
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
