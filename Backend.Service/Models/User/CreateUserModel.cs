using System.ComponentModel.DataAnnotations;

namespace Backend.Service.Models.User
{
    public class CreateUserModel
    {
        [Required(ErrorMessage = "This field is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "This field is required")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "This field is required")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [Compare(nameof(ConfirmPassword))]
        public string Password { get; set; }

        [Required(ErrorMessage = "This field is required")]
        public string ConfirmPassword { get; set; }
    }
}
