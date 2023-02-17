using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Backend.Service.Annotations;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Entities.Poco;

namespace Backend.Service.Models.Product
{
    public class CreateProductModel
    {

        [Required(ErrorMessage = "This field is required")]
        [MaxLength(256)]
        public string Name { get; set; } = null!;


        [AllUriValidator(ErrorMessage = "This field is invalid")]
        public ICollection<Media>? Medias { get; set; }
        public string? Description { get; set; }
        public string? ShortDescription { get; set; }
        public bool? Gender { get; set; } = null;
        public string? Age { get; set; } = null;

        [Range(0.0, double.MaxValue, ErrorMessage = "The field {0} must be greater than {1}.")]
        public double Price { get; set; } = 0.0;

        [Range(0, int.MaxValue, ErrorMessage = "The field {0} must be greater than {1}.")]
        public int Quantity { get; set; } = 0;

        public int CategoryId { get; set; }

        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
