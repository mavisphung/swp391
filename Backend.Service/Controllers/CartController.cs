using Backend.Service.Entities;
using Backend.Service.Models.Cart;
using Backend.Service.Models.Order;
using Backend.Service.Models.Validation;
using Backend.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Service.Controllers
{
    [Route("api/cart")]
    [ApiController]
    [Produces("application/json")]
    public class CartController : PagedController
    {
        private readonly UserService _userService;
        private readonly CartService _cartService;
        public CartController(
            UserService userService, 
            CartService cartService)
        {
            _userService = userService;
            _cartService = cartService;
        }
        /// <summary>
        /// Get current user's cart
        /// </summary>
        /// <returns>Return the cart</returns>
        /// <response code="200">Return the cart of current user</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCart()
        {
            var currentUser = await GetCurrentUser(_userService);
            IEnumerable<CartItemRM> cartItems = _cartService.GetCartItems(currentUser);
            return Ok(cartItems);
        }

        private async Task<User> CreateCartIfNull(User user)
        {
            if (user.Cart == null)
            {
                var newCart = new Cart()
                {
                    Owner = user,
                    TotalPrice = 0,
                    AddedBy = user.Fullname,
                    UpdatedBy = user.Fullname
                };
                await _cartService.CreateCartObject(newCart);
            }

            return user;
        }

        /// <summary>
        /// Thêm sản phẩm vào giỏ hàng bằng nút MUA NGAY
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToCart([FromBody] AddCartModel model)
        {
            var currentUser = await CreateCartIfNull(await GetCurrentUser(_userService));
            //Console.WriteLine($"CartItems: {currentUser.Cart.CartItems}");
            //Console.WriteLine("Expected to generate a SQL statement hereeeeeeeeee");
            //var foundCartItem = currentUser.Cart.CartItems.Where(x => x.Product.Id == model.ProductId).First();
            //Console.WriteLine($"Cart Item found: {foundCartItem.ToString()}");
            //Console.WriteLine("After generating a SQL statement hereeeeeeeeee");

            var response = await _cartService.ProcessAddToCart(currentUser, model.ProductId.GetValueOrDefault());

            return Created("", response);
        }
    }
}
