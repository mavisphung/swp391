using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Helper;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories
{
    public class ProductRepository : GeneralRepository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductRepository> _logger;
        internal DbSet<Product> _dbSet;
        public ProductRepository(
            ApplicationDbContext db,
            ILogger<ProductRepository> logger
            ) : base(db)
        {
            _context = db;
            _dbSet = _context.Set<Product>();
            _logger = logger;
        }

        public async Task<Product> GetAsync(int id)
        {
            try
            {
                return await _dbSet.Where(p => !p.IsDeleted && p.Id == id).Include("Category").FirstAsync();
            } catch (Exception ex)
            {
                Console.WriteLine($"ProductRepository.GetAsync : {ex.Message}");
                throw new NotFoundException(BaseError.PRODUCT_NOT_FOUND.ToString());
            }

        }
    }
}
