using System.ComponentModel.DataAnnotations;

namespace Backend.Service.Models.Banner
{
    public class CreateBannerModel
    {
        [Required(ErrorMessage = "This field is required")]
        [MaxLength(255)]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "This field is required")]
        [Url(ErrorMessage = "This must be an url")]
        public string Image { get; set; } = null!;
    }
}
