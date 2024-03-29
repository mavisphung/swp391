﻿using System.Linq.Expressions;
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
        private readonly IOrderRepository _orderRepository;
        private readonly VNPayConst _vnPayConst;
        public PaymentService(
            IPaymentRepository paymentRepository, 
            VNPayConst vnPayConst,
            IOrderRepository orderRepository)
        {
            _paymentRepository = paymentRepository;
            _vnPayConst = vnPayConst;
            _orderRepository = orderRepository;
        }

        public async Task<PaymentResponseModel> CreatePayment(PaymentRequestModel paymentRequestModel)
        {
            Order order = await _orderRepository.GetFirstOrDefaultAsync(ord => !ord.IsDeleted && ord.Id == paymentRequestModel.OrderId);
            if (order == null)
            {
                throw new NotFoundException(BaseError.ORDER_NOT_FOUND.ToString());
            }

            DateTime orderDate = DateTime.UtcNow;

            Guid guid = this.ToGuid(paymentRequestModel, orderDate);

            var newPayment = new Payment
            {
                PaymentCode = guid,
                Amount = paymentRequestModel.Amount,
                PaymentMethod = paymentRequestModel.PaymentMethod,
                PayInAdvance = paymentRequestModel.PayInAdvance,
                PaidDate = orderDate,
                OrderId = paymentRequestModel.OrderId,
                IsSuccess = true
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
            byte[] payInAdvanceByte = Encoding.ASCII.GetBytes(paymentRequestModel.PayInAdvance + "");

            byteList.AddRange(nowByte);
            byteList.Add(Convert.ToByte(paymentRequestModel.PaymentMethod));
            byteList.AddRange(payInAdvanceByte);
            byteList.AddRange(amountBytes);
            byteList.AddRange(orderIdByte);

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
