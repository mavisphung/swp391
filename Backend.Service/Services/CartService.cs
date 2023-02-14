using Backend.Service.Entities;
using Backend.Service.Models.Cart;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Services
{
    public class CartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IProductRepository _productRepository;

        public CartService(
            ICartRepository cartRepository,
            ICartItemRepository cartItemRepository,
            IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _cartItemRepository = cartItemRepository;
            _productRepository = productRepository;
        }

        public async Task CreateCartObject(Cart cart) 
        {
            await _cartRepository.AddAsync(cart);
            await _cartRepository.SaveDbChangeAsync();
        }

        /// <summary>
        /// Nếu cart item tồn tại thì thêm 1 vào quantity <br/>
        /// không thì tạo mới cart item với quantity là 1
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        public async Task<CartItemRM> ProcessAddToCart(User user, int productId)
        {
            //var taskGetCartItem = _cartItemRepository.GetCartItemByProductIdAsync(productId);
            //var taskGetProduct = _productRepository.GetAsync(productId);
            //Task.WaitAll(taskGetCartItem, taskGetProduct);

            //CartItem foundCartItem = taskGetCartItem.Result;
            //Product product = taskGetProduct.Result;

            CartItem foundCartItem = await _cartItemRepository.GetCartItemByProductIdAsync(productId);
            Product product = await _productRepository.GetAsync(productId);

            // Xử lí tăng quantity lên 1 nếu đã tồn tại
            if (foundCartItem != null)
            {
                // tồn tại thì tăng quantity lên 1 đơn vị
                foundCartItem.Quantity += 1;
                foundCartItem.ItemPrice = foundCartItem.Quantity * foundCartItem.Product.Price;
                foundCartItem.UpdatedBy = user.Fullname;
                _cartItemRepository.Update(foundCartItem);
                _cartItemRepository.SaveDbChange();
                return new CartItemRM(foundCartItem);
            }


            //// Nếu không tồn tại cart item thì tạo mới với quantity là 1
            foundCartItem = new CartItem()
            {
                Quantity = 1,
                ItemPrice = product.Price * 1,
                AddedBy = user.Fullname,
                UpdatedBy = user.Fullname,
                IsPicked = true,
                CartId = user.Cart.Id,
                ProductId = product.Id,
            };
            await _cartItemRepository.AddAsync(foundCartItem);
            await _cartItemRepository.SaveDbChangeAsync();

            return new CartItemRM(foundCartItem);
        }


        public IEnumerable<CartItemRM> GetCartItems(User currentUser)
        {
            return _cartItemRepository.GetDbSet()
                .Where(ci => ci.CartId == currentUser.Cart.Id)
                .Include("Product")
                .Select(ci => new CartItemRM(ci))
                .ToList();
        }
    }
}
