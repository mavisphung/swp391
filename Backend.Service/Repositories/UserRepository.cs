﻿using Backend.Service.Entities;
using Backend.Service.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LOSMST.DataAccess.Repository.DatabaseRepository
{
    public class UserRepository : GeneralRepository<User>, IUserRepository
    {
        private readonly BirdStoreContext _dbContext;
        internal DbSet<User> _dbSet;
        public UserRepository(BirdStoreContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<User>();
        }

        public bool CheckEmailExsited(string emailValue)
        {
            return _dbContext.Users.FirstOrDefault(a => a.Email == emailValue) != null;
        }

        public void CreateLocalUser(User account)
        {
            string password = "petrolimex";
            var valueBytes = Encoding.UTF8.GetBytes(password);
            string passwordHass = Convert.ToBase64String(valueBytes);
            account.Password = passwordHass;
            _dbSet.Add(account);
        }

        public int UpdatePassword(int accountId, string currentPassword, string newPassword)
        {
            if (!newPassword.Equals("") && !currentPassword.Equals(""))
            {
                if (newPassword != currentPassword)
                {
                    var account = _dbContext.Users.FirstOrDefault(x => x.Id == accountId);
                    if (account != null)
                    {
                        var encodeCurrentPassword = Encoding.UTF8.GetBytes(currentPassword);
                        string currentPasswordHass = Convert.ToBase64String(encodeCurrentPassword);
                        if (currentPasswordHass == account.Password)
                        {
                            var valueBytesEncode = Encoding.UTF8.GetBytes(newPassword);
                            string passwordHass = Convert.ToBase64String(valueBytesEncode);
                            account.Password = passwordHass;
                            _dbSet.Update(account);
                            return 1;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                }
                else
                {
                    return -1;
                }
            }
            return -2;
        }
    }
}