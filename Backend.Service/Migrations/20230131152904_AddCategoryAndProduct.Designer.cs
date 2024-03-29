﻿// <auto-generated />
using System;
using Backend.Service.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Service.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230131152904_AddCategoryAndProduct")]
    partial class AddCategoryAndProduct
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Service.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AddedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("CategoryType")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Backend.Service.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AddedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Images")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ImportQuantity")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Backend.Service.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AddedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AddedBy = "",
                            CreatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3588),
                            IsDeleted = false,
                            Name = "Admin",
                            UpdatedBy = "",
                            UpdatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3587)
                        },
                        new
                        {
                            Id = 2,
                            AddedBy = "",
                            CreatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3591),
                            IsDeleted = false,
                            Name = "Staff",
                            UpdatedBy = "",
                            UpdatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3590)
                        },
                        new
                        {
                            Id = 3,
                            AddedBy = "",
                            CreatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3592),
                            IsDeleted = false,
                            Name = "Customer",
                            UpdatedBy = "",
                            UpdatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3592)
                        },
                        new
                        {
                            Id = 4,
                            AddedBy = "",
                            CreatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3593),
                            IsDeleted = false,
                            Name = "Guest",
                            UpdatedBy = "",
                            UpdatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3592)
                        });
                });

            modelBuilder.Entity("Backend.Service.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AddedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Avatar")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool?>("Gender")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<bool>("Status")
                        .HasColumnType("boolean");

                    b.Property<string>("UpdatedBy")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AddedBy = "",
                            CreatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3681),
                            Email = "admin@chystore.vn",
                            Fullname = "Admin Chystore",
                            Gender = false,
                            IsDeleted = false,
                            Password = "MTIzNDU2",
                            Phone = "0123456789",
                            RoleId = 1,
                            Status = true,
                            UpdatedBy = "",
                            UpdatedDate = new DateTime(2023, 1, 31, 15, 29, 4, 201, DateTimeKind.Utc).AddTicks(3680)
                        });
                });

            modelBuilder.Entity("Backend.Service.Entities.Product", b =>
                {
                    b.HasOne("Backend.Service.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Backend.Service.Entities.User", b =>
                {
                    b.HasOne("Backend.Service.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Backend.Service.Entities.Category", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("Backend.Service.Entities.Role", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
