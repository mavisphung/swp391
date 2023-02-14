using System.ComponentModel.DataAnnotations.Schema;
using Backend.Service.Consts;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Entities
{
    [Table("Payments")]
    [Index(nameof(PaymentCode), IsUnique = true)]
    public class Payment : BaseEntity
    {
        public Guid PaymentCode { get; set; }
        
        // Giá tiền
        public int Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Vnpay;
        public DateTime PaidDate { get; set; } = DateTime.UtcNow;

        // Order foreign key
    }
}
