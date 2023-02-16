using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Backend.Service.Models.Cart
{
    public class AddCartModel
    {
        [Required]
        [Range(0, int.MaxValue)]
        public int ProductId { get; set; }

        public override string? ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
