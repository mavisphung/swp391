using System.Runtime.CompilerServices;
using Backend.Service.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Backend.Service.Entities
{
    public partial class ApplicationDbContext : DbContext
    {

        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ShippingAddress> ShippingAddresses { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Banner> Banners { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<CartItem> CartItems { get; set; } = null!;
        public virtual DbSet<Feedback> FeedBacks { get; set; } = null!;

        // Needed for Add-Migration command
        public ApplicationDbContext() { }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
            //Console.WriteLine("Created database successfully");
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
            //modelBuilder.GenerateRoles();

            // FTS for category
            modelBuilder.Entity<Category>()
                .HasGeneratedTsVectorColumn(
                    p => p.SearchVector,
                    "english",  // Text search config
                    p => new { p.Name })  // Included properties
                .HasIndex(p => p.SearchVector)
                .HasMethod("GIN"); // Index method on the search vector (GIN or GIST)

            // FTS for product
            modelBuilder.Entity<Product>()
                .HasGeneratedTsVectorColumn(
                    p => p.SearchVector,
                    "english",
                    p => new { p.Name })
                .HasIndex(p => p.SearchVector)
                .HasMethod("GIN");

            // FTS for banner
            modelBuilder.Entity<Banner>()
                .HasGeneratedTsVectorColumn(
                    p => p.SearchVector,
                    "english",
                    p => new { p.Name })
                .HasIndex(p => p.SearchVector)
                .HasMethod("GIN");

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
                ((BaseEntity)entityEntry.Entity).UpdatedDate = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }

        private async Task<EntityEntry> UpdateEntitiesAsync(EntityEntry entityEntry)
        {
            return await Task.Run(() => 
            {
                ((BaseEntity)entityEntry.Entity).UpdatedDate = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.UtcNow;
                }
                return entityEntry;
            });
        }

        public async Task<int> SaveChangesAsync()
        {
            // Automatically add CreatedDate and UpdatedDate if changes happen
            var entries = ChangeTracker
                            .Entries()
                            .Where(e => e.Entity is BaseEntity && (
                                    e.State == EntityState.Added
                                    || e.State == EntityState.Modified))
                            .Select(et => UpdateEntitiesAsync(et));

            await Task.WhenAll(entries);
            return await base.SaveChangesAsync();
        }
    }
}
