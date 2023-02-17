using System.Security.Authentication;
using System.Security.Claims;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Backend.Service.Controllers
{
    
    public class PagedController : ControllerBase
    {
        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
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

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public async Task<User> GetCurrentUser(UserService userService)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var claim = claimsIdentity?.FindFirst("id");
            User? user = null;
            try
            {
                user = await userService.GetUserByIdAsync(int.Parse(claim?.Value));
            } catch
            {
                throw new UnauthenticatedException();
            }
            return user;
        }
    }
}
