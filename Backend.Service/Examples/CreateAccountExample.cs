using Backend.Service.Models.Banner;
using Backend.Service.Models.User;
using Swashbuckle.AspNetCore.Filters;

namespace Backend.Service.Examples
{
    public class CreateAccountExample : IExamplesProvider<CreateUserModel>
    {
        public CreateUserModel GetExamples()
        {
            return new CreateUserModel()
            {
                Email = "nguoibimatthegioi@gmail.com",
                FullName = "Phùng Chí Huy",
                PhoneNumber = "0349797318",
                Password = "123456",
                ConfirmPassword = "123456"
            };
        }
    }
}
