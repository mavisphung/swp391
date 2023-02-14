using Backend.Service.Entities;

namespace Backend.Service.Repositories.IRepositories
{
    public interface IBannerRepository : IGenericRepository<Banner>
    {
        Task<Banner> GetAsync(int id);
    }
}
