using Backend.Service.Entities;

namespace Backend.Service.Repositories.IRepositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<Product> GetAsync(int id);
    }
}
