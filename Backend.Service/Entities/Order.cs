using Backend.Service.Consts;

namespace Backend.Service.Entities
{
    public class Order : BaseEntity
    {
        public double TotalPrice { get; set; }
        public string CancelledReason { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Unpaid;
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public DateTime? CloseDate { get; set; }
        public DateTime? EstimatedReceiveDate { get; set; }

    }
}
