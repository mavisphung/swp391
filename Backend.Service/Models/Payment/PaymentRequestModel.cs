using Backend.Service.Consts;

namespace Backend.Service.Models.Payment
{
    public class PaymentRequestModel
    {
        public Guid PaymentCode { get; set; }

        public int Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DateTime PaidDate { get; set; } = DateTime.UtcNow;
    }
}
