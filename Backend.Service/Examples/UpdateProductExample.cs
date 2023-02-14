using Backend.Service.Models.Product;
using Swashbuckle.AspNetCore.Filters;

namespace Backend.Service.Examples
{
    public class UpdateProductExample : IExamplesProvider<UpdateProductModel>
    {
        public UpdateProductModel GetExamples()
        {
            return new UpdateProductModel()
            {
                Name = "Tên chào mào mới",
                Description = "Mô tả về loài chim",
                ShortDescription = "Chim loại gì (Trung Nam, Lạng Sơn,...), chim non (bổi, thuần, mộc)",
                Images = new string[]
                {
                    "link ảnh 1",
                    "link ảnh 2"
                },
                Price = 100000,
                Quantity = 100,
                Status = Consts.ProductStatus.Available,
                CategoryId = 3
            };
        }
    }
}
