using Backend.Service.Helper;
using Backend.Service.Models.Banner;
using Backend.Service.Models.Validation;
using Backend.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Service.Controllers
{
    [Route("api/banner")]
    [ApiController]
    [Produces("application/json")]
    public class BannerController : PagedController
    {
        private readonly BannerService _bannerService;
        private readonly ILogger<BannerController> _logger;
        public BannerController(
            BannerService bannerService,
            ILogger<BannerController> logger)
        {
            _bannerService = bannerService;
            _logger = logger;
        }
        /// <summary>
        /// Năm anh lên 6, thích xem hoạt hình
        /// Anh không thích nước mắt rớt trên mặt mình
        /// </summary>
        /// <returns></returns>
        // GET: api/<Banner>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] FilterParameter filter)
        {
            var data = await _bannerService.GetAllAsync(filter);
            AddPaginationToHeader(data);
            return Ok(data);
        }

        /// <summary>
        /// Ba anh nói anh càng lớn anh càng lười
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET api/<Banner>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var found = await _bannerService.GetAsync(id);
            return Ok(found);
        }

        /// <summary>
        /// Dù mai tóc ta phai mào
        /// </summary>
        /// <param name="model"></param>
        // POST api/<Banner>
        [HttpPost]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] CreateBannerModel model)
        {
            var createdObj = await _bannerService.AddAsync(model);
            return Created("", createdObj);
        }

        //// PUT api/<Banner>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<Banner>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bannerService.RemoveAsync(id);
            return NoContent();
        }
    }
}
