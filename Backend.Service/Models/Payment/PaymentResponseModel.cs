namespace Backend.Service.Models.Payment
{
    public class PaymentResponseModel : BaseModel<Entities.Payment>
    {
        public int ? Id { get; set; }
        public Guid PaymentCode { get; set; }
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsSuccess { get; set; }
        public int PaymentMethod { get; set; }
        public int PayInAdvance { get; set; }

        public PaymentResponseModel(Entities.Payment entity) : base(entity)
        {
            Id = entity.Id;
            PaymentCode = entity.PaymentCode;
            OrderId = entity.OrderId;
            OrderDate = entity.PaidDate;
            IsSuccess = entity.IsSuccess;
            PaymentMethod = (int) entity.PaymentMethod;
            PayInAdvance = entity.PayInAdvance;
        }
    }
}
