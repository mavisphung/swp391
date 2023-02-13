using System.Linq.Expressions;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Helper;
using Backend.Service.Helper.VNPay;
using Backend.Service.Models.Payment;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using Diacritics.Extensions;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class PaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly BirdStoreConst _birdStoreConst;
        public PaymentService(IPaymentRepository paymentRepository, BirdStoreConst birdStoreConst)
        {
            _paymentRepository = paymentRepository;
            _birdStoreConst = birdStoreConst;
        }

        public PaymentResponseModel CreatePayment(PaymentRequestModel paymentRequestModel)
        {
            PaymentResponseModel response = new PaymentResponseModel();
            switch (paymentRequestModel.PaymentMethod)
            {
                case Consts.PaymentMethod.AtStore:
                    
                    break;
                case Consts.PaymentMethod.Vnpay:
                    string url = _birdStoreConst.getVNPayUrl();
                    string tmnCode = _birdStoreConst.getVNPayTmnCode();
                    string hashSecret = _birdStoreConst.getHashSecret();
                    PayLib pay = new PayLib();
                    pay.AddRequestData("vnp_Version", "2.1.0"); //Phiên bản api mà merchant kết nối. Phiên bản hiện tại là 2.1.0
                    pay.AddRequestData("vnp_Command", "pay"); //Mã API sử dụng, mã cho giao dịch thanh toán là 'pay'
                    pay.AddRequestData("vnp_TmnCode", tmnCode); //Mã website của merchant trên hệ thống của VNPAY (khi đăng ký tài khoản sẽ có trong mail VNPAY gửi về)
                    pay.AddRequestData("vnp_Amount", "1000000"); //số tiền cần thanh toán, công thức: số tiền * 100 - ví dụ 10.000 (mười nghìn đồng) --> 1000000
                    pay.AddRequestData("vnp_BankCode", ""); //Mã Ngân hàng thanh toán (tham khảo: https://sandbox.vnpayment.vn/apis/danh-sach-ngan-hang/), có thể để trống, người dùng có thể chọn trên cổng thanh toán VNPAY
                    pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss")); //ngày thanh toán theo định dạng yyyyMMddHHmmss
                    pay.AddRequestData("vnp_CurrCode", "VND"); //Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
                    pay.AddRequestData("vnp_IpAddr", Util.GetIpAddress()); //Địa chỉ IP của khách hàng thực hiện giao dịch
                    pay.AddRequestData("vnp_Locale", "vn"); //Ngôn ngữ giao diện hiển thị - Tiếng Việt (vn), Tiếng Anh (en)
                    pay.AddRequestData("vnp_OrderInfo", "Thanh toan don hang"); //Thông tin mô tả nội dung thanh toán
                    pay.AddRequestData("vnp_OrderType", "other"); //topup: Nạp tiền điện thoại - billpayment: Thanh toán hóa đơn - fashion: Thời trang - other: Thanh toán trực tuyến
                    pay.AddRequestData("vnp_ReturnUrl", ""); //URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán
                    pay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString()); //mã hóa đơn
                    break;
                default:
                    break;
            }
            return response;
        }
    }
}
