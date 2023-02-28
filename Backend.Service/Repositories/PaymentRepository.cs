using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories
{
    public class PaymentRepository : GeneralRepository<Payment>, IPaymentRepository
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<Payment> _dbSet;
        private readonly ILogger<PaymentRepository> _logger;
        public PaymentRepository(ApplicationDbContext db, ILogger<PaymentRepository> logger) : base(db)
        {
            _db = db;
            _dbSet = db.Set<Payment>();
            _logger = logger;
        }

        public async Task<Payment> GetAsync(int id)
        {
            _logger.LogInformation($"{this.GetType().FullName}: GetAsync(int id) invoked...");
            try
            {
                return await dbSet.Where(pay => !pay.IsDeleted && pay.Id == id).SingleAsync();
            } catch(Exception _)
            {
                throw new NotFoundException();
            }
        }
    }
}
