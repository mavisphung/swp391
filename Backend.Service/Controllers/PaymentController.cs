using System.ComponentModel;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Helper;
using Backend.Service.Models.Payment;
using Backend.Service.Models.Validation;
using Backend.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Service.Controllers
{
    [Route("api/payment")]
    [ApiController]
    [Produces("application/json")]
    public class PaymentController : PagedController
    {
        private readonly PaymentService _paymentService;
        public PaymentController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }


        public async Task<IActionResult> CreatePayment(PaymentRequestModel paymentRequestModel)
        {
            _paymentService.CreatePayment(paymentRequestModel);
            return Ok();
        }
    }
}
