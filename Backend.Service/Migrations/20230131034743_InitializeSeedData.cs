using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Service.Migrations
{
    public partial class InitializeSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "AddedBy", "CreatedDate", "IsDeleted", "Name", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2095), false, "Admin", "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2094) },
                    { 2, "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2097), false, "Staff", "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2097) },
                    { 3, "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2098), false, "Customer", "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2098) },
                    { 4, "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2099), false, "Guest", "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2098) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AddedBy", "Avatar", "CreatedDate", "Email", "Fullname", "Gender", "IsDeleted", "Password", "Phone", "RoleId", "Status", "UpdatedBy", "UpdatedDate" },
                values: new object[] { 1, "", null, new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2184), "admin@chystore.vn", "Admin Chystore", false, false, "MTIzNDU2", "0123456789", 1, true, "", new DateTime(2023, 1, 31, 3, 47, 43, 742, DateTimeKind.Utc).AddTicks(2183) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
