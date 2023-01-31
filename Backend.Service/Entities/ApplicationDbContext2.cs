using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Backend.Service.Entities
{
    public partial class ApplicationDbContext2 
        //: DbContext
    {
        public ApplicationDbContext2()
        {
        }

        //public ApplicationDbContext2(DbContextOptions<ApplicationDbContext2> options)
        //    : base(options)
        //{
        //    Database.EnsureCreated();
        //}

        //public virtual DbSet<Category> Categories { get; set; } = null!;
        //public virtual DbSet<Role> Roles { get; set; } = null!;
        //public virtual DbSet<User> Users { get; set; } = null!;

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        Console.WriteLine("Run programmatical configuration");
        //        optionsBuilder.UseNpgsql("User ID=postgres;Password=BmzMZht1FUAjD3nB1rby;Server=swp391-db-instance.czjd9ym4s3b2.ap-southeast-1.rds.amazonaws.com;Port=5432;Database=birdstore;Integrated Security=true;Pooling=true;");
        //    }
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Category>(entity =>
        //    {
        //        entity.ToTable("Category");

        //        entity.Property(e => e.Id).HasColumnName("id");

        //        entity.Property(e => e.CategoryType)
        //            .HasMaxLength(64)
        //            .IsUnicode(false)
        //            .HasColumnName("categoryType");

        //        entity.Property(e => e.Description)
        //            .HasMaxLength(512)
        //            .IsUnicode(false)
        //            .HasColumnName("description");

        //        entity.Property(e => e.Name)
        //            .HasMaxLength(256)
        //            .IsUnicode(false)
        //            .HasColumnName("name");
        //    });

        //    modelBuilder.Entity<Role>(entity =>
        //    {
        //        entity.ToTable("Role");

        //        entity.Property(e => e.Id).HasColumnName("id");

        //        entity.Property(e => e.Name)
        //            .HasMaxLength(256)
        //            .IsUnicode(false)
        //            .HasColumnName("name");
        //    });

        //    modelBuilder.Entity<User>(entity =>
        //    {
        //        entity.ToTable("User");

        //        entity.Property(e => e.Id).HasColumnName("id");

        //        entity.Property(e => e.Avatar)
        //            .IsUnicode(false)
        //            .HasColumnName("avatar");

        //        entity.Property(e => e.Email)
        //            .HasMaxLength(256)
        //            .IsUnicode(false)
        //            .HasColumnName("email");

        //        entity.Property(e => e.Fullname)
        //            .HasMaxLength(256)
        //            .IsUnicode(false)
        //            .HasColumnName("fullname");

        //        entity.Property(e => e.Gender).HasColumnName("gender");

        //        entity.Property(e => e.Password)
        //            .HasMaxLength(256)
        //            .IsUnicode(false)
        //            .HasColumnName("password");

        //        entity.Property(e => e.Phone)
        //            .HasMaxLength(10)
        //            .IsUnicode(false)
        //            .HasColumnName("phone")
        //            .IsFixedLength();

        //        entity.Property(e => e.RoleId).HasColumnName("roleId");

        //        entity.Property(e => e.IsActive).HasColumnName("status");
        //    });

        //    OnModelCreatingPartial(modelBuilder);
        //}

        //partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
