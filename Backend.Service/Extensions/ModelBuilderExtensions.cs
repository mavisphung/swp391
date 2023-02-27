using Backend.Service.Consts;
using Backend.Service.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void GenerateRoles(this ModelBuilder modelBuilder, PasswordHasher hasher)
        {
            // Add role if role does not exist in db
            modelBuilder.Entity<Role>().HasData(
                new Role
                {
                    Id = 1,
                    Name = "Admin",
                },
                new Role
                {
                    Id = 2,
                    Name = "Staff",
                },
                new Role
                {
                    Id = 3,
                    Name = "Customer",
                },
                new Role
                {
                    Id = 4,
                    Name = "Guest",
                }
            );

            // Add admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin@chystore.vn",
                    Fullname = "Admin Chystore",
                    Phone = "0349797318",
                    Gender = false,
                    RoleId = 1,
                    Status = true,
                    Password = hasher.HashPassword("123456")
                }
            );
        }
    }
}
