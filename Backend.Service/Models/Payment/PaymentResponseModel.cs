namespace Backend.Service.Models.Payment
{
    public class PaymentResponseModel
    {
        //  Được cấp bởi VNPAY
        public string MerchantId { get; set; }
        // 	Tên Website Merchant    
        public string MerchantName { get; set; }
        // 	Mã GD của website merchant
        public string MerchantTransactionReference { get; set; }
        // 	Thông tin mô tả từ website merchant
        public string TransactionInfo { get; set; }
        // 	Số tiền được thanh toán
        public double Ammount { get; set; }
        // 	Đơn vị tiền tệ được thanh toán
        public string CurrentCode { get; set; }
        // 	Trạng thái GD
        public bool TransactionResponseCode { get; set; }
        // 	Thông báo từ cổng thanh toán
        public string Message { get; set; }
        // 	Mã GD trên cổng thanh toán
        public string TransactionNumber { get; set; }
        //  Ngân hàng GD
        public string Bank { get; set; }
    }
}
