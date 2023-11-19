using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Create USER table
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lastname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Firstname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            // Insert data USER
            migrationBuilder.InsertData(
            table: "User",
            columns: new[] { "Id", "Lastname", "Firstname", "Avatar" },
            values: new object[,]
            {
                { 1, "Sanchez", "Rick", "https://static.wikia.nocookie.net/rickandmorty/images/a/a6/Rick_Sanchez.png/revision/latest?cb=20160923150728" },
                { 2, "Sanchez", "Beth", "https://static.wikia.nocookie.net/rickandmorty/images/5/58/Beth_Smith.png/revision/latest?cb=20191122063320" },
                { 3, "Jerry", "Smith", "https://static.wikia.nocookie.net/rickandmorty/images/f/f1/Jerry_Smith.png/revision/latest?cb=20160923151111" },
                { 4, "Morty", "Smith", "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137" },
                { 5, "Summer", "Smith", "https://static.wikia.nocookie.net/rickandmorty/images/a/ad/Summer_is_cool.jpeg/revision/latest?cb=20160919183158" }
            });

            // Create TASK Table
            migrationBuilder.CreateTable(
                name: "Task",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Label = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Status = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Task", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Task_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            // Create UserId Task INDEX
            migrationBuilder.CreateIndex(
                name: "IX_Task_UserId",
                table: "Task",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Task");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
