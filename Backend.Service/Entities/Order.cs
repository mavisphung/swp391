﻿using System.ComponentModel.DataAnnotations.Schema;
using Backend.Service.Consts;

namespace Backend.Service.Entities
{
    [Table("Orders")]
    public class Order : BaseEntity
    {
        public double TotalPrice { get; set; }

        [Column(TypeName = "text")]
        public string? CancelledReason { get; set; } = string.Empty;

        [Column(TypeName = "text")]
        public string? Note { get; set; } = string.Empty;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
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
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }

        public virtual ICollection<Payment> Payments { get; set; }
        #endregion
    }
}
