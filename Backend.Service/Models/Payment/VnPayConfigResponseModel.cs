﻿namespace Backend.Service.Models.Payment
{
    public class VnPayConfigResponseModel
    {
        public string BaseURL { get; set; }
        public string TmnCode { get; set; }
        public string HashSecret { get; set; }
        public string Command { get; set; }
        public string CurrCode { get; set; }
        public string Version { get; set; }
        public string Locale { get; set; }
    }
}
