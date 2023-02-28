using Backend.Service.Consts;
using Backend.Service.Models.Category;
using Swashbuckle.AspNetCore.Filters;

namespace Backend.Service.Examples
{
    public class CategoryExample : IExamplesProvider<CreateCategoryModel>
    {
        public CreateCategoryModel GetExamples()
        {
            return new CreateCategoryModel()
            {
                Name = "Chim chào mào Trung Nam",
                Description = "Loại chim hót hay nhất trong vùng nam bộ",
                Image = "https://thuvienthucung.com/wp-content/uploads/2021/09/Cam-Nang-Nuoi-Cham-Soc-Chim-Chao-Mao.jpg",
                CategoryType = CategoryType.Bird,
                RelativeCategories = new HashSet<int>()
                {
                    1, 2, 3, 4, 5
                },
            };
        }
    }
}
