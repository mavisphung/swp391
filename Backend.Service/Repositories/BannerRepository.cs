using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories
{
    public class BannerRepository : GeneralRepository<Banner>, IBannerRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly DbSet<Banner> _dbSet;
        private readonly ILogger<BannerRepository> _logger;
        public BannerRepository(
            ApplicationDbContext db, 
            ILogger<BannerRepository> logger) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<Banner>();
            _logger = logger;
        }

        public async Task<Banner> GetAsync(int id)
        {
            var found = await _dbSet.Where(x => !x.IsDeleted && x.Id == id).FirstAsync();
            return found ?? throw new NotFoundException(BaseError.BANNER_NOT_FOUND.ToString());
        }
    }
}
