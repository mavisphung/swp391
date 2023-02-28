namespace Backend.Service.Helper
{
    public class PaymentFilterParameter : FilterParameter
    {
        public int? OrderId { get; set; }
        public Guid? PaymentCode { get; set; }
        public DateTime? Date { get; set; }
        public int? UserId { get; set; }
    }
}
