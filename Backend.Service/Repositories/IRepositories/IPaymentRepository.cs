using Backend.Service.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories.IRepositories
{
    public interface IPaymentRepository : IGenericRepository<Payment>
    {
        Task<Payment> GetAsync(int id);
    }
}
