using Backend.Service.Entities;
using Backend.Service.Models.Cart;

namespace Backend.Service.Models.User
{
    public class UserResponseModel : BaseModel<Entities.User>
    {
        public string Fullname { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Phone { get; set; } = String.Empty;
        public string Avatar { get; set; } = String.Empty;
        public bool Gender { get; set; } = false;

        //public UserModel() { }

        public UserResponseModel(Entities.User user) : base(user)
        {
            Fullname = user.Fullname;
            Email = user.Email;
            Phone = user.Phone;
            Avatar = user.Avatar ?? "";
            Gender = user.Gender ?? false;
        }
    }
}
