using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Backend.Service.Annotations;
using Backend.Service.Consts;

namespace Backend.Service.Models.Payment
{
    public class PaymentRequestModel
    {
        [AttributeNotBlank(ErrorMessage = "Amount is not empty")]
        public int Amount { get; set; }

        [EnumDataType(typeof(PaymentMethod))]
        public PaymentMethod PaymentMethod { get; set; }

        [AttributeNotBlank(ErrorMessage = "Order Id is not empty")]
        public int OrderId { get; set; }

        [EnumDataType(typeof(PaymentMethod))]
        public PaymentType? PaymentType { get; set; }
    }
}
