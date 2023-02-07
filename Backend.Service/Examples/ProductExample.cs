using Backend.Service.Models.Product;
using Swashbuckle.AspNetCore.Filters;

namespace Backend.Service.Examples
{
    public class ProductExample : IExamplesProvider<CreateProductModel>
    {
        public CreateProductModel GetExamples()
        {
            return new CreateProductModel
            {
                Name = "Chim Chào An trống",
                Description = "Đặt gì cũng được nè",
                CategoryId = 1,
                Images = new string[]
                {
                    "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/320620423_645965470600283_5399016748258514205_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RVQImNi32mwAX_n7MH6&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdSDrO96shUdednMeFri54TmEbV6_Kw7EL7RVVzcwLl0WA&oe=6408565D",
                    "https://cdn.chotot.com/xBn9lSfENJaI8dneJA7Tl3eVHZa_HkAgyGcqMLp1Aeg/preset:view/plain/5ddb2bec7b9ad02aa7cc0ab5b2e0d799-2810886282489889542.jpg",
                    "https://cdn.chotot.com/xBn9lSfENJaI8dneJA7Tl3eVHZa_HkAgyGcqMLp1Aeg/preset:view/plain/5ddb2bec7b9ad02aa7cc0ab5b2e0d799-2810886282489889542.jpg",
                    "https://image.nhadatmoi.net/yeuchim/wp-content/uploads/2020/09/21175428/chim-sao-an-gi.jpg"
                },
                Price = 200000,
                Quantity = 100
            };
        }
    }
}
