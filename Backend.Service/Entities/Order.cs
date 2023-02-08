using System.ComponentModel.DataAnnotations.Schema;
using Backend.Service.Consts;

namespace Backend.Service.Entities
{
    [Table("Orders")]
    public class Order : BaseEntity
    {
        public double TotalPrice { get; set; }
        public string CancelledReason { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Unpaid;
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public DateTime? CloseDate { get; set; }
        public DateTime? EstimatedReceiveDate { get; set; }

        #region Foreign keys
        public int? UserId { get; set; }
        public User User { get; set; }

        public int? ShippingAddressId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        #endregion

        #region One to many Relationship
        public ICollection<OrderDetail> OrderDetails { get; set; }

        #endregion
    }
}
