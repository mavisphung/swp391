using Backend.Service.Entities;
using Backend.Service.Repositories.IRepositories;

namespace Backend.Service.Repositories
{
    public class CartRepository : GeneralRepository<Cart>, ICartRepository
    {
        private readonly ApplicationDbContext _db;
        public CartRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
