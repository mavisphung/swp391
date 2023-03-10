using Backend.Service.Helper;
using Backend.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Controllers
{
    [Route("api/statistic")]
    [ApiController]
    public class StatisticController : ControllerBase
    {

        private readonly StatisticService _statisticService;

        public StatisticController(StatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet]
        //[Authorize(Roles = "1")]
        public IActionResult GetStatisticInfo([FromQuery] StatisticFilterParameter filter)
        {
            var data = _statisticService.GetOrderStatistic(filter);
            return Ok(data);
        }
    }
}
