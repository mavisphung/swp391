using Backend.Service.Helper;
using Backend.Service.Repositories.IRepositories;
using Backend.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Controllers
{
    [Route("api/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly IProductRepository _productRepository;
        public HomeController(ProductService productService, IProductRepository productRepository)
        {
            _productService = productService;
            _productRepository = productRepository;
        }

        [HttpGet]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> Get([FromQuery] ProductFilterParameter filter)
        {
            var data = await _productRepository.GetAllAsync(p => p.Gender == null && p.Age == null);
            Console.WriteLine(data.Count());
            return Ok(new { id = 1, message = "authenticated successfully" });
        }
    }
}
