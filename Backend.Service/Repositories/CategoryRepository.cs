using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories
{
    public class CategoryRepository : GeneralRepository<Category>, ICategoryRepository
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<Category> _dbSet;
        private readonly ILogger<CategoryRepository> _logger;
        public CategoryRepository(
            ApplicationDbContext db, 
            ILogger<CategoryRepository> logger
            ) : base(db)
        {
            _db = db;
            _dbSet = db.Set<Category>();
            _logger = logger;
        }

        public async Task<Category> GetAsync(int id)
        {
            _logger.LogInformation($"{this.GetType().FullName}: GetAsync(int id) invoked...");
            try
            {
                return await dbSet.Where(cate => !cate.IsDeleted && cate.Id == id).SingleAsync();
            } catch(Exception _)
            {
                throw new NotFoundException(BaseError.CATEGORY_NOT_FOUND.ToString());
            }
        }
    }
}
