using Backend.Service.Entities;

namespace Backend.Service.Repositories.IRepositories
{
    public interface ICartItemRepository : IGenericRepository<CartItem>
    {
        Task<CartItem> GetCartItemByProductIdAsync(int productId);
    }
}
