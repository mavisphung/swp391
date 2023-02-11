using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Backend.Service.Consts;

namespace Backend.Service.Models.Product
{
    public class UpdateProductModel
    {
        [MaxLength(256)]
        public string? Name { get; set; }

        public IEnumerable<string>? Images { get; set; }
        public string? Description { get; set; }

        [Range(0.0, double.MaxValue, ErrorMessage = "The field {0} must be greater than {1}.")]
        public double Price { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "The field {0} must be greater than {1}.")]
        public int? Quantity { get; set; }

        public int? CategoryId { get; set; }


        [Required(ErrorMessage = "This field is required")]
        [EnumDataType(typeof(ProductStatus), ErrorMessage = "Product status is invalid. Try again from 0 to 1")]
        public ProductStatus Status { get; set; }

        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
