using System.Security.Cryptography;
using System.Text;
using Backend.Service.Consts;

namespace Backend.Service.Extensions
{
    public class PasswordHasher
    {
        private readonly BirdStoreConst _birdStoreConst;
        private const int keySize = 64;
        private const int iterations = 350000;
        private HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        public PasswordHasher(BirdStoreConst birdStoreConst)
        {
            _birdStoreConst = birdStoreConst;
        }

        public static string Hash(string raw)
        {
            var encodeCurrentPassword = Encoding.UTF8.GetBytes(raw);
            string hashed = Convert.ToBase64String(encodeCurrentPassword);
            return hashed;
        }

        public string HashPassword(string raw)
        {
            var salt = _birdStoreConst.GetSalt();
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(raw),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return Convert.ToHexString(hash);
        }

        public bool VerifyPassword(string password, string hash)
        {

            var salt = _birdStoreConst.GetSalt();
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(
                    Encoding.UTF8.GetBytes(password),
                    salt,
                    iterations,
                    hashAlgorithm,
                    keySize);

            return hashToCompare.SequenceEqual(Convert.FromHexString(hash));
        }
    }
}
