using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Service.Migrations
{
    public partial class UpdateMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AddedBy", "Avatar", "CreatedDate", "Email", "Fullname", "Gender", "IsDeleted", "Password", "Phone", "RoleId", "Status", "UpdatedBy", "UpdatedDate" },
                values: new object[] { "System", "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/320620423_645965470600283_5399016748258514205_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RVQImNi32mwAX_n7MH6&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdSDrO96shUdednMeFri54TmEbV6_Kw7EL7RVVzcwLl0WA&oe=6408565D", new DateTime(2023, 2, 11, 15, 21, 54, 403, DateTimeKind.Utc).AddTicks(3437), "admin@chystore.vn", "Admin Chystore", false, false, "62F5202C4416A0B47046B40F21085558010FE0A1BAF35950DAEBE7E7037247CD154361DA9212C3524FB6E855C6E9D8F289E6CA3FC239A39982073C308E515357", "0349797318", 1, true, "System", new DateTime(2023, 2, 11, 15, 21, 54, 403, DateTimeKind.Utc).AddTicks(3437) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
