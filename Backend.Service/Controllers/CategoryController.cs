using System.ComponentModel;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Helper;
using Backend.Service.Models.Category;
using Backend.Service.Models.Validation;
using Backend.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Service.Controllers
{
    [Route("api/category")]
    [ApiController]
    [Produces("application/json")]
    public class CategoryController : PagedController
    {
        private readonly CategoryService _categoryService;
        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// Get all categories
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <param name="filter"></param>
        /// <response code="200">Return data successfully</response>
        // GET: api/category
        [HttpGet]
        public IActionResult GetAll([FromQuery] FilterParameter filter)
        {
            var data = _categoryService.GetAll(filter);
            AddPaginationToHeader(data);
            return Ok(data);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id)
        {
            var categoryModel = await _categoryService.GetCategoryByIdAsync(id);
            return Ok(categoryModel);
        }

        /// <summary>
        /// Creates a Category.
        /// </summary>
        /// <param name="item"></param>
        /// <returns>A newly created Category</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /api/category
        ///     {
        ///        "name": "Chim chào mào",
        ///        "description": "Đây là chim chào mào",
        ///        "categoryType": 1
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the body is invalid</response>
        [HttpPost]
        [ValidateModel]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] CreateCategoryModel model)
        {
            var category = await _categoryService.CreateAsync(model);
            return Created("", category);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> Put(int id, [FromBody] CreateCategoryModel model)
        {
            // Incompleted
            var data = await _categoryService.UpdateCategory(id, model);
            return Accepted(data);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Delete(int id)
        {
            _categoryService.Remove(id);
            return Accepted();
        }
    }
}
