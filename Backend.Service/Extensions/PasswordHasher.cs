using System.Text;

namespace Backend.Service.Extensions
{
    public class PasswordHasher
    {
        public static string Hash(string raw)
        {
            var encodeCurrentPassword = Encoding.UTF8.GetBytes(raw);
            string hashed = Convert.ToBase64String(encodeCurrentPassword);
            return hashed;
        }

        public string HashPassword(string raw)
        {
            var encodeCurrentPassword = Encoding.UTF8.GetBytes(raw);
            string hashed = Convert.ToBase64String(encodeCurrentPassword);
            return hashed;
        }
    }
}
