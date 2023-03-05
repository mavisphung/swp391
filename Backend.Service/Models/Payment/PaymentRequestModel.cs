using Backend.Service.Annotations;
using Backend.Service.Consts;

namespace Backend.Service.Models.Payment
{
    public class PaymentRequestModel
    {
        [AttributeNotBlank(ErrorMessage = "Amount is not empty")]
        public int Amount { get; set; }
        [AttributeNotBlank(ErrorMessage = "Payment Method is not empty")]
        public int PaymentMethod { get; set; }
        [AttributeNotBlank(ErrorMessage = "Order Id is not empty")]
        public int OrderId { get; set; }
        [AttributeMinMax(ErrorMessage = "PayInAdvance from 1 to 100", Maximum = 100, Minimum = 1)]
        public int PayInAdvance { get; set; } = 100;
        [AttributeNotBlank(ErrorMessage = "Is Success is not empty")]
        public bool IsSuccess { get; set; }
    }
}
