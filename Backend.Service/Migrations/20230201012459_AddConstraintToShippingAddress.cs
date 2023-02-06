using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Service.Migrations
{
    public partial class AddConstraintToShippingAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ShippingAddresses_Email",
                table: "ShippingAddresses");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6667), new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6665) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6669), new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6669) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6670), new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6670) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6671), new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6671) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6762), new DateTime(2023, 2, 1, 1, 24, 59, 655, DateTimeKind.Utc).AddTicks(6762) });

            migrationBuilder.CreateIndex(
                name: "IX_ShippingAddresses_Email_PhoneNumber",
                table: "ShippingAddresses",
                columns: new[] { "Email", "PhoneNumber" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ShippingAddresses_Email_PhoneNumber",
                table: "ShippingAddresses");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3468), new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3466) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3470), new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3470) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3471), new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3471) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3472), new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3472) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3600), new DateTime(2023, 2, 1, 0, 47, 4, 417, DateTimeKind.Utc).AddTicks(3600) });

            migrationBuilder.CreateIndex(
                name: "IX_ShippingAddresses_Email",
                table: "ShippingAddresses",
                column: "Email",
                unique: true);
        }
    }
}
