using Backend.Service.Entities;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories
{
    public class CategoryRepository : GeneralRepository<Category>, ICategoryRepository
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<Category> _dbSet;
        public CategoryRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = db.Set<Category>();
        }
    }
}
