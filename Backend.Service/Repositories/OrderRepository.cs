using Backend.Service.Entities;
using Backend.Service.Repositories.IRepositories;

namespace Backend.Service.Repositories
{
    public class OrderRepository : GeneralRepository<Order>, IOrderRepository
    {
        private readonly ApplicationDbContext _db;
        public OrderRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
    }
}
