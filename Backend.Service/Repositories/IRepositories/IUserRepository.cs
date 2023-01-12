﻿using Backend.Service.Entities;
using LOSMST.DataAccess.Repository.IRepository;

namespace Backend.Service.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public bool CheckEmailExsited(string emailValue);
        //public User GetStoreManager(string storeCode);
        public int UpdatePassword(int accountId, string currentPassword, string newPassword);
        //public void CreateLocalAccount(User account);
        //public User CheckAccountBasicInfor(int accountId);
        //public bool UpdateAccount(User account);
    }
}