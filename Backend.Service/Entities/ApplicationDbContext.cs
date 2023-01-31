using System.Runtime.CompilerServices;
using Backend.Service.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service.Entities
{
    public partial class ApplicationDbContext : DbContext
    {

        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }

        // Needed for Add-Migration command
        public ApplicationDbContext() { }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
            Console.WriteLine("Created database successfully");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                Console.WriteLine("Run programmatical configuration");
                optionsBuilder.UseNpgsql("User ID=postgres;Password=BmzMZht1FUAjD3nB1rby;Server=swp391-db-instance.czjd9ym4s3b2.ap-southeast-1.rds.amazonaws.com;Port=5432;Database=birdstore;Integrated Security=true;Pooling=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.GenerateRoles();
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            // Automatically add CreatedDate and UpdatedDate if changes happen
            var entries = ChangeTracker
                            .Entries()
                            .Where(e => e.Entity is BaseEntity && (
                                    e.State == EntityState.Added
                                    || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).UpdatedDate = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.Now;
                }
            }

            return base.SaveChanges();
        }
    }
}
