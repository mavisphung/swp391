using Backend.Service.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Extensions
{
    public static class ModelBuilderExtensions
    {

        public static void GenerateRoles(this ModelBuilder modelBuilder)
        {
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

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin@chystore.vn",
                    Fullname = "Admin Chystore",
                    Phone = "0123456789",
                    Gender = false,
                    RoleId = 1,
                    Status = true,
                    Password = PasswordHasher.Hash("123456")
                }
            );
        }
    }
}
