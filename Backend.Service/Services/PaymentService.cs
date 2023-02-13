using System.Linq.Expressions;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Helper;
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
        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
    }
}
