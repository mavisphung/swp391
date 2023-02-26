using Backend.Service.Consts;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Backend.Service.Models.Category
{
    public class UpdateCategoryModel
    {
        [MaxLength(64, ErrorMessage = "The maximum length is 64 characters")]
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        [EnumDataType(typeof(CategoryType), ErrorMessage = "Category type is invalid. Try again from 0 to 4")]
        public CategoryType? CategoryType { get; set; }
        public ICollection<int>? RelativeCategories { get; set; } = new HashSet<int>();

        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
