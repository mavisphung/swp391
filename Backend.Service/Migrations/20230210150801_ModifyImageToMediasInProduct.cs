using System.Collections.Generic;
using Backend.Service.Entities.Poco;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Service.Migrations
{
    public partial class ModifyImageToMediasInProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Images",
                table: "Products");

            migrationBuilder.AddColumn<ICollection<Media>>(
                name: "Medias",
                table: "Products",
                type: "jsonb",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Medias",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Images",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
