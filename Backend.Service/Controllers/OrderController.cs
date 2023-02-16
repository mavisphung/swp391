using Backend.Service.Helper;
using Backend.Service.Models.Order;
using Backend.Service.Models.Validation;
using Backend.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Service.Controllers
{
    [Route("api/order")]
    [ApiController]
    [Produces("application/json")]
    public class OrderController : PagedController
    {
        private readonly OrderService _orderService;
        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        /// <summary>
        /// [ADMIN] Lấy danh sách order
        /// </summary>
        /// <returns></returns>
        // GET: api/order
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromQuery] OrderFilterParameter filter)
        {
            var response = await _orderService.GetAllAsync(filter);
            AddPaginationToHeader(response);
            return Ok(response);
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        /// <summary>
        /// Thêm nguyên cái cart để tạo order chứ không phải thêm từng sản phẩm lẻ <br />
        /// Dành cho user chưa authentication
        /// </summary>
        /// <returns></returns>
        /// <response code="201">Tạo thành công</response>
        [HttpPost("unauth")]
        [ValidateModel]
        public async Task<IActionResult> AddTheWholeCart([FromBody] UnauthOrderRequestModel model)
        {
            var response = await _orderService.ProcessAddToCartUnauth(model);
            return Created("", response);
        }
    }
}
