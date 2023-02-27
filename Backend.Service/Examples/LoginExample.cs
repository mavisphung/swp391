using Backend.Service.Models.Request;
using Swashbuckle.AspNetCore.Filters;

namespace Backend.Service.Examples
{
    public class LoginExample : IExamplesProvider<LoginRequestModel>
    {
        public LoginRequestModel GetExamples()
        {
            return new LoginRequestModel()
            {
                Email = "nguoibimatthegioi@gmail.com",
                Password = "123456"
            };
        }
    }
}
