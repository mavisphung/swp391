
using Backend.Service.Consts;

namespace Backend.Service.Models.Category
{
    public class CategoryResponseModel : BaseModel<Entities.Category>
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public CategoryType CategoryType { get; set; }

        public CategoryResponseModel(Entities.Category entity) : base(entity)
        {
            Name = entity.Name;
            Description = entity.Description;
            CategoryType = entity.CategoryType;
        }
    }
}
