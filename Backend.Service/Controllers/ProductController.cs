﻿using Backend.Service.Helper;
using Backend.Service.Models.Product;
using Backend.Service.Models.Validation;
using Backend.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Service.Controllers
{
    [Route("api/product")]
    [ApiController]
    [Produces("application/json")]
    public class ProductController : PagedController
    {
        private readonly ProductService _productService;
        private readonly ILogger<ProductController> _logger;
        public ProductController(
            ProductService productService,
            ILogger<ProductController> logger)
        {
            _productService = productService;
            _logger = logger;
        }

        /// <summary>
        /// Lấy sản phẩm theo filter: CategoryType, CategoryId, FromPrice, ToPrice, Status
        /// </summary>
        /// <param name="pagingParameter"></param>
        /// <response code="200">Get data successfully</response>
        /// 
        // GET: api/<ProductController>
        // TODO: Them filter CategoryType - CHECKED
        // TODO: Them search theo product code
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Get([FromQuery] ProductFilterParameter pagingParameter)
        {
            _logger.LogInformation("Get all product invoked...");
            var data = await _productService.GetAllAsync(pagingParameter);
            AddPaginationToHeader(data);
            return Ok(data);
        }

        /// <summary>
        /// Đừng ai nhắc dến em một lời
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            _logger.LogInformation($"Get product with id {id}...");
            var productModel = await _productService.GetProductByIdAsync(id);
            return Ok(productModel);
        }

        /// <summary>
        /// Hello from the other sideeeeee
        /// </summary>
        /// <param name="model"></param>c
        /// <returns>Return a newly created product</returns>
        /// <response code="201">Created successfully</response>
        /// <response code="400">If body is null</response>
        // POST api/product
        [HttpPost]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] CreateProductModel model)
        {
            _logger.LogInformation("Creating new product...");
            var data = await _productService.AddAsync(model);
            _logger.LogInformation("Created new product successfully");
            return Created("", data);
        }

        /// <summary>
        /// To tell u im sorry
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <response code="202">Updated successfully</response>
        /// <response code="400">If body is null</response>
        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateProductModel model)
        {
            _logger.LogInformation($"Updating product with id {id}");
            _logger.LogInformation(model.ToString());
            var responseModel = await _productService.UpdateProduct(id, model);
            return Accepted(responseModel);
        }


        /// <summary>
        /// Remove a product by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogDebug($"Deleting product with id {id}");
            await _productService.RemoveAsync(id);
            return NoContent();
        }


        /// <summary>
        /// Lấy các sản phẩm liên quan
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpGet("{productId}/relatives")]
        public async Task<IActionResult> GetRelativeProduct(int productId, [FromQuery] FilterParameter filter)
        {
            _logger.LogInformation($"{nameof(GetRelativeProduct)} invoked...");
            var response = await _productService.GetRelativeProductsAsync(productId, filter);
            return Ok(response);
        }

        // TODO: Them API cho activate/deactivate product
    }
}
