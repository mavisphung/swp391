using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Backend.Service.Consts;

namespace Backend.Service.Models.Category
{
    public class CreateCategoryModel
    {

        [Required(ErrorMessage = "This field is required")]
        [MaxLength(64, ErrorMessage = "The maximum length is 64 characters")]
        public string Name { get; set; }
        public string? Description { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [EnumDataType(typeof(CategoryType), ErrorMessage = "Category type is invalid. Try again from 0 to 4")]
        public CategoryType CategoryType { get; set; }

        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
