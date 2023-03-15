using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Backend.Service.Annotations;
using Backend.Service.Consts;
using Backend.Service.Models.Cart;

namespace Backend.Service.Models.Order
{
    public class UnauthOrderRequestModel
    {
        // Shipping address
        public class UnauthCustomerModel
        {
            [EmailAddress]
            public string Email { get; set; }
            public string Fullname { get; set; }
            public string PhoneNumber { get; set; }
            public string Address { get; set; }
            public string? Ward { get; set; } = string.Empty;
            public string? District { get; set; } = string.Empty;
            public string? Province { get; set; } = string.Empty;
        }

        public UnauthCustomerModel Customer { get; set; }

        public string? Note { get; set; } = string.Empty;

        [EnumDataType(typeof(PaymentMethod))]
        public PaymentMethod PaymentMethod { get; set; }

        [Range(0, 100)]
        public int? PayInAdvance { get; set; } = 100;

        [RequiredCollection(ErrorMessage = "This can not be empty")]
        public IEnumerable<AddCartModel> CartItems { get; set; } = new HashSet<AddCartModel>();
    }
}
