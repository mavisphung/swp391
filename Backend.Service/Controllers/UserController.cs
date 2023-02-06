using System.Security.Policy;
using Backend.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
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
        public async Task<IActionResult> GetAll()
        {
            var users = _userService.GetAll().ToList();
            return Ok(users);
        }
    }
}
