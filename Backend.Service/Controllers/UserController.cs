using Backend.Service.Helper;
using Backend.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Service.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : PagedController
    {
        private readonly UserService _userService;
        private readonly ILogger _logger;
        public UserController(
            UserService userService,
            ILogger<UserController> logger
            )
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] FilterParameter pagingParam)
        {
            Console.WriteLine($"Page: {pagingParam.PageNumber} \nPage Size: {pagingParam.PageSize}");
            var pagedList = await _userService.GetAllAsync(pagingParam);

            AddPaginationToHeader(pagedList);

            var results = pagedList.Select(u => u.ToData()).ToList();

            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            _logger.LogInformation("Getting User information by Id");
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user?.ToData());
        }

        //[HttpGet("{id}")]
        //public IActionResult GetUserById(int id)
        //{
        //    var user = _userService.GetUserById(id);
        //    return Ok(user?.ToData());
        //}
    }
}
