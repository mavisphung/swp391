using Backend.Service.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories.IRepositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<Category> GetAsync(int id);
    }
}
