using Backend.Service.Entities;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories
{
    public class CartItemRepository : GeneralRepository<CartItem>, ICartItemRepository
    {
        private readonly ApplicationDbContext _db;

        public CartItemRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<CartItem?> GetCartItemByProductIdAsync(int productId)
        {
            try
            {
                return await dbSet.Where(ci => !ci.IsDeleted && ci.ProductId == productId).Include("Product").FirstAsync();
            }
            catch
            {
                return null;
            }
        }
    }
}
