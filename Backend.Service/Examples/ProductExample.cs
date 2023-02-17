using Backend.Service.Entities.Poco;
using Backend.Service.Models.Product;
using Swashbuckle.AspNetCore.Filters;
using static System.Net.WebRequestMethods;

namespace Backend.Service.Examples
{
    public class ProductExample : IExamplesProvider<CreateProductModel>
    {
        public CreateProductModel GetExamples()
        {
            return new CreateProductModel
            {
                Name = "Chim Chào An trống",
                Description = "Mô tả về loài chim",
                ShortDescription = "Chim loại gì (Trung Nam, Lạng Sơn,...), chim non (bổi, thuần, mộc)",
                CategoryId = 3,
                Medias = new Media[]
                {
                    //"https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/320620423_645965470600283_5399016748258514205_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RVQImNi32mwAX_n7MH6&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdSDrO96shUdednMeFri54TmEbV6_Kw7EL7RVVzcwLl0WA&oe=6408565D",
                    //"https://cdn.chotot.com/xBn9lSfENJaI8dneJA7Tl3eVHZa_HkAgyGcqMLp1Aeg/preset:view/plain/5ddb2bec7b9ad02aa7cc0ab5b2e0d799-2810886282489889542.jpg",
                    //"https://cdn.chotot.com/xBn9lSfENJaI8dneJA7Tl3eVHZa_HkAgyGcqMLp1Aeg/preset:view/plain/5ddb2bec7b9ad02aa7cc0ab5b2e0d799-2810886282489889542.jpg",
                    //"https://image.nhadatmoi.net/yeuchim/wp-content/uploads/2020/09/21175428/chim-sao-an-gi.jpg"
                    new Media
                    {
                        Url = "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/320620423_645965470600283_5399016748258514205_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RVQImNi32mwAX_n7MH6&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdSDrO96shUdednMeFri54TmEbV6_Kw7EL7RVVzcwLl0WA&oe=6408565D",
                        Type = Consts.MediaType.Png,
                    },
                    new Media
                    {
                        Url = "https://cdn.chotot.com/xBn9lSfENJaI8dneJA7Tl3eVHZa_HkAgyGcqMLp1Aeg/preset:view/plain/5ddb2bec7b9ad02aa7cc0ab5b2e0d799-2810886282489889542.jpg",
                        Type = Consts.MediaType.Jpg,
                    },
                    new Media
                    {
                        Url = "https://cdn.chotot.com/xBn9lSfENJaI8dneJA7Tl3eVHZa_HkAgyGcqMLp1Aeg/preset:view/plain/5ddb2bec7b9ad02aa7cc0ab5b2e0d799-2810886282489889542.jpg",
                        Type = Consts.MediaType.Jpg,
                    },
                    new Media
                    {
                        Url = "https://image.nhadatmoi.net/yeuchim/wp-content/uploads/2020/09/21175428/chim-sao-an-gi.jpg",
                        Type = Consts.MediaType.Jpg,
                    },

                },
                Price = 200000,
                Quantity = 100
            };
        }
    }
}
