using Backend.Service.Entities;
using Backend.Service.Exceptions;

namespace Backend.Service.Repositories.IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public bool CheckEmailExsited(string emailValue);
        //public User GetStoreManager(string storeCode);
        public int UpdatePassword(int accountId, string currentPassword, string newPassword);

        //public void CreateLocalAccount(User account);
        //public User CheckAccountBasicInfor(int accountId);
        //public bool UpdateAccount(User account);

        public User? GetUserById(int id);
        public Task<User?> GetUserByIdAsync(int id);

        public User? GetUserByEmail(string email);
        public Task<User?> GetUserByEmailAsync(string email);

        public User? GetUserByPhone(string phone);
        public Task<User?> GetUserByPhoneAsync(string phone);
    }
}
