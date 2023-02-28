using System.Linq.Expressions;
using System.Text;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Helper;
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
        private readonly VNPayConst _vnPayConst;
        public PaymentService(IPaymentRepository paymentRepository, VNPayConst vnPayConst)
        {
            _paymentRepository = paymentRepository;
            _vnPayConst = vnPayConst;
        }

        public async Task<PaymentResponseModel> CreatePayment(PaymentRequestModel paymentRequestModel)
        {

            DateTime orderDate = DateTime.UtcNow;

            Guid guid = this.ToGuid(paymentRequestModel, orderDate);

            var newPayment = new Payment
            {
                PaymentCode = guid,
                Amount = paymentRequestModel.Amount,
                PaymentMethod = (PaymentMethod)paymentRequestModel.PaymentMethod,
                PaymentType = (PaymentType)paymentRequestModel.PaymentType,
                PaidDate = orderDate,
                OrderId = paymentRequestModel.OrderId,
                IsSuccess = paymentRequestModel.IsSuccess
            };
            try
            {
                await _paymentRepository.AddAsync(newPayment);
                await _paymentRepository.SaveDbChangeAsync();
                return new PaymentResponseModel(newPayment);
            }
            catch (Exception ex)
            {
                throw new BaseException(ex.Message);
            }
        }

        public Guid ToGuid(PaymentRequestModel paymentRequestModel, DateTime now)
        {
            List<byte> byteList = new List<byte>();
            byte[] nowByte = BitConverter.GetBytes(now.Ticks);
            byte[] amountBytes = Encoding.ASCII.GetBytes(paymentRequestModel.Amount + "");
            byte[] orderIdByte = Encoding.ASCII.GetBytes(paymentRequestModel.OrderId + "");

            byteList.AddRange(nowByte);
            byteList.Add(Convert.ToByte(paymentRequestModel.PaymentMethod));
            byteList.Add(Convert.ToByte(paymentRequestModel.PaymentType));
            byteList.AddRange(amountBytes);
            byteList.AddRange(orderIdByte);
            byteList.Add(Convert.ToByte(paymentRequestModel.IsSuccess));

            var bytes = byteList.ToArray();
            Array.Resize(ref bytes, 16);
            return new Guid(bytes);
        }

        public async Task<PagedList<PaymentResponseModel>> GetAllAsync(PaymentFilterParameter filter)
        {
            var predicate = PredicateBuilder.New<Payment>().And(payment => !payment.IsDeleted);

            if (filter.OrderId.GetValueOrDefault() != 0)
            {
                predicate = predicate.And(payment => payment.OrderId == filter.OrderId);
            }

            if (filter.PaymentCode != null)
            {
                predicate = predicate.And(payment => payment.PaymentCode.Equals(filter.PaymentCode));
            }

            if (filter.Date != null)
            {
                predicate = predicate.And(payment => payment.PaidDate == filter.Date);
            }

            if (filter.UserId.GetValueOrDefault() != 0)
            {
                predicate = predicate.And(payment => payment.Order.UserId == filter.UserId);
            }

            IEnumerable<Payment> query = await _paymentRepository.GetAllAsync(
                filter: predicate,
                includeProperties: "Order");

            return PagedList<PaymentResponseModel>.ToPagedList(
                query.AsQueryable().OrderBy(u => u.Id).Select(entity => new PaymentResponseModel(entity)),
                filter.PageNumber,
                filter.PageSize);
        }

        public VnPayConfigResponseModel GetVnPayConfig()
        {
            var response = new VnPayConfigResponseModel
            {
                BaseURL = _vnPayConst.GetBaseURL(),
                Command = _vnPayConst.GetCommand(),
                CurrCode = _vnPayConst.GetCurrCode(),
                HashSecret = _vnPayConst.GetHashSecret(),
                Locale = _vnPayConst.GetLocale(),
                TmnCode = _vnPayConst.GetTmnCode(),
                Version = _vnPayConst.GetVersion()
            };
            return response;
        }

        public async Task<PaymentResponseModel> GetPaymentById(int id)
        {
            var found = new Payment();
            try
            {
                found = await _paymentRepository.GetAsync(id);
            } catch (Exception ex)
            {
                throw new BaseException(ex.Message);
            }
            return new PaymentResponseModel(found);
        }
    }
}
