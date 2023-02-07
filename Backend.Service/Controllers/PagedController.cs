using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Service.Controllers
{
    
    public class PagedController : ControllerBase
    {
        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        /// <summary>
        /// Adds two numbers and returns the result
        /// </summary>
        /// <param name="pagedList">The list that is paginated</param>
        /// <returns>void</returns>
        public void AddPaginationToHeader(dynamic pagedList)
        {
            var metadata = new
            {
                pagedList.TotalCount,
                pagedList.PageSize,
                pagedList.CurrentPage,
                pagedList.TotalPages,
                pagedList.HasNext,
                pagedList.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
        }
    }
}
