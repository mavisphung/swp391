using Backend.Service.Helper;
using Backend.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Controllers
{
    [Route("api/stats")]
    [ApiController]
    public class StatisticController : PagedController
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
            AddPaginationToHeader(data);
            return Ok(data);
        }

        [HttpGet("cities")]
        //[Authorize(Roles = "1")]
        public async Task<IActionResult> GetProductCountByCity()
        {
            var data = await _statisticService.GetProductCountByCities();
            return Ok(data);
        }

        [HttpGet("counts")]
        public async Task<IActionResult> GetCounts([FromQuery] StatisticFilterParameter filter)
        {
            var data = await _statisticService.GetCountAsync();
            AddPaginationToHeader(data);
            return Ok(data);
        }

        [HttpGet("profits")]
        public async Task<IActionResult> GetProfits([FromQuery] StatisticFilterParameter filter)
        {
            var data = await _statisticService.GetProfitsByDate(filter);
            AddPaginationToHeader(data);
            return Ok(data);
        }
    }
}
