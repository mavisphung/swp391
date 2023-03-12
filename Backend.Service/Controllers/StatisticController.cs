using Backend.Service.Helper;
using Backend.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Controllers
{
    [Route("api/stats")]
    [ApiController]
    public class StatisticController : ControllerBase
    {

        private readonly StatisticService _statisticService;

        public StatisticController(StatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet("products")]
        //[Authorize(Roles = "1")]
        public IActionResult GetProductCountByDate([FromQuery] StatisticFilterParameter filter)
        {
            var data = _statisticService.GetProductCountByDate(filter);
            return Ok(data);
        }

        [HttpGet("counts")]
        public async Task<IActionResult> GetCounts([FromQuery] StatisticFilterParameter filter)
        {
            var data = await _statisticService.GetCountAsync();
            return Ok(data);
        }
    }
}
