namespace Backend.Service.Consts
{
    public class VNPayConst
    {
        private readonly IConfiguration _configuration;
        public VNPayConst(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GetBaseURL()
        {
            return _configuration["AppSettings:VNPay:BaseUrl"];
        }

        public string GetTmnCode()
        {
            return _configuration["AppSettings:VNPay:TmnCode"];
        }
        public string GetHashSecret()
        {
            return _configuration["AppSettings:VNPay:HashSecret"];
        }
        public string GetCommand()
        {
            return _configuration["AppSettings:VNPay:Command"];
        }
        public string GetCurrCode()
        {
            return _configuration["AppSettings:VNPay:CurrCode"];
        }
        public string GetVersion()
        {
            return _configuration["AppSettings:VNPay:Version"];
        }
        public string GetLocale()
        {
            return _configuration["AppSettings:VNPay:Locale"];
        }
    }
}
