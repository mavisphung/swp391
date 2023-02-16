using Backend.Service.Entities;

namespace Backend.Service.Repositories.IRepositories
{
    public interface IShippingAddressRepository : IGenericRepository<ShippingAddress>
    {
        ShippingAddress GetShippingAddressByEmail(string email);
        Task<ShippingAddress?> GetShippingAddressByEmailAsync(string email);


        ShippingAddress GetShippingAddressByPhone(string phone);
        Task<ShippingAddress?> GetShippingAddressByPhoneAsync(string phone);
    }
}
