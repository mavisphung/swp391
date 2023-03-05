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
        private readonly ILogger<PaymentController> _logger;
        public PaymentController(PaymentService paymentService, ILogger<PaymentController> logger)
        {
            _paymentService = paymentService;
            _logger = logger;
        }


        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] PaymentRequestModel paymentRequestModel)
        {
            var data = await _paymentService.CreatePayment(paymentRequestModel);
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetPaymentByFilter([FromQuery]PaymentFilterParameter payload)
        {
            _logger.LogInformation("Get all product invoked...");
            var data = await _paymentService.GetAllAsync(payload);
            return Ok(data);
        }

        [HttpGet("config")]
        public async Task<IActionResult> GetVnPayConfiguration()
        {
            _logger.LogInformation("Get vnpay configuration");
            var data = _paymentService.GetVnPayConfig();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            _logger.LogInformation($"Get product with id {id}...");
            var response = await _paymentService.GetPaymentById(id);
            return Ok(response);
        }
    }
}
