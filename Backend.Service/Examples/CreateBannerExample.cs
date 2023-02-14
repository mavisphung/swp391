using Backend.Service.Models.Banner;
using Swashbuckle.AspNetCore.Filters;

namespace Backend.Service.Examples
{
    public class CreateBannerExample : IExamplesProvider<CreateBannerModel>
    {
        public CreateBannerModel GetExamples()
        {
            return new CreateBannerModel
            {
                Name = "Tên banner gì cũng được",
                Image = "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/320620423_645965470600283_5399016748258514205_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RVQImNi32mwAX_n7MH6&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdSDrO96shUdednMeFri54TmEbV6_Kw7EL7RVVzcwLl0WA&oe=6408565D"
            };
        }
    }
}
