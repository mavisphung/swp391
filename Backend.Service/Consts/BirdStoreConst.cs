namespace Backend.Service.Consts
{
    public class BirdStoreConst
    {
        private readonly IConfiguration _configuration;
        public BirdStoreConst(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public byte[] GetSalt()
        {
            return new byte[] { 207, 183, 156, 49, 5, 72, 204, 77, 15, 119, 185, 90, 66, 92, 33, 243, 32, 68, 138, 121, 69, 179, 30, 67, 45, 138, 117, 17, 84, 47, 195, 19, 6, 33, 6, 186, 163, 96, 250, 218, 122, 139, 243, 171, 207, 250, 8, 208, 242, 157, 153, 232, 118, 61, 216, 70, 181, 167, 164, 44, 31, 17, 205, 34 };
        }

        public string GetTokenKey()
        {
            return _configuration.GetSection("AppSettings:Token").Value;
        }

        public string getVNPayUrl()
        {
            return _configuration.GetSection("AppSettings:VNPay:Url").Value;
        }

        public string getVNPayTmnCode()
        {
            return _configuration.GetSection("AppSettings:VNPay:TmnCode").Value;
        }

        public string getHashSecret()
        {
            return _configuration.GetSection("AppSettings:VNPay:HashSecret").Value;
        }
    }
}

