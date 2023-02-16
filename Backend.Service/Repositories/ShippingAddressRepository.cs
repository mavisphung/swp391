using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Exceptions;
using Backend.Service.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Repositories
{
    public class ShippingAddressRepository : GeneralRepository<ShippingAddress>, IShippingAddressRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly DbSet<ShippingAddress> _dbSet;
        public ShippingAddressRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<ShippingAddress>();
        }

        public ShippingAddress GetShippingAddressByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<ShippingAddress?> GetShippingAddressByEmailAsync(string email)
        {
            try
            {
                return await _dbSet.Where(a => !a.IsDeleted && a.Email.Equals(email)).FirstAsync();
            }
            catch (Exception ex)
            {
                throw new NotFoundException(BaseError.ADDRESS_NOT_FOUND.ToString());
            }
        }

        public ShippingAddress GetShippingAddressByPhone(string phone)
        {
            throw new NotImplementedException();
        }

        public async Task<ShippingAddress?> GetShippingAddressByPhoneAsync(string phone)
        {
            try
            {
                return await _dbSet.Where(a => !a.IsDeleted && a.PhoneNumber.Equals(phone)).FirstAsync();
            }
            catch (Exception ex)
            {
                throw new NotFoundException(BaseError.ADDRESS_NOT_FOUND.ToString());
            }
        }
    }
}
