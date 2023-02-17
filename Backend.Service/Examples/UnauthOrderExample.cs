using Backend.Service.Consts;
using Backend.Service.Models.Cart;
using Backend.Service.Models.Order;
using Swashbuckle.AspNetCore.Filters;

namespace Backend.Service.Examples
{
    public class UnauthOrderExample : IExamplesProvider<UnauthOrderRequestModel>
    {
        public UnauthOrderRequestModel GetExamples()
        {
            return new UnauthOrderRequestModel()
            {
                Customer = new UnauthOrderRequestModel.UnauthCustomerModel()
                {
                    Email = "nguoibimatthegioi2@gmail.com",
                    Fullname = "Nguyễn Phùng Phong Ba",
                    PhoneNumber = "0349797319",
                    Address = "216 Hồng Bàng",
                    Ward = "Phường 12",
                    District = "Quận 5",
                    Province = "Tp. Hồ Chí Minh"
                },
                Note = "Có hay không đều được",
                PaymentMethod = PaymentMethod.Vnpay,
                CartItems = new List<AddCartModel>()
                {
                    new AddCartModel()
                    {
                        ProductId = 22,
                        Quantity = 2,
                    },
                    new AddCartModel()
                    {
                        ProductId = 21,
                        Quantity = 2,
                    }
                }
            };
        }
    }
}
