using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class TaskAddCompletedDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Remove all data from the Task table
            migrationBuilder.Sql("DELETE FROM Task");

            // Add column
            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "Task",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "Task");
        }
    }
}
