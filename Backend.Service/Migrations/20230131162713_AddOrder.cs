using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Service.Migrations
{
    public partial class AddOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TotalPrice = table.Column<double>(type: "double precision", nullable: false),
                    CancelledReason = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CloseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EstimatedReceiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: false),
                    AddedBy = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4572), "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4570) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4574), "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4574) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4575), "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4575) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4576), "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4575) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4655), "System", new DateTime(2023, 1, 31, 16, 27, 13, 397, DateTimeKind.Utc).AddTicks(4654) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9716), "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9715) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9718), "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9717) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9718), "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9718) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9719), "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9719) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AddedBy", "CreatedDate", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9799), "", new DateTime(2023, 1, 31, 16, 4, 8, 173, DateTimeKind.Utc).AddTicks(9799) });
        }
    }
}
