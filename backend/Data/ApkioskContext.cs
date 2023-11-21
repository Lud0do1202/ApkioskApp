using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApkioskContext : DbContext
    {
        public ApkioskContext(DbContextOptions<ApkioskContext> options)
            : base(options)
        {
        }

        public DbSet<backend.Models.User> User { get; set; } = default!;

        public DbSet<backend.Models.Task> Task { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // TASK >> User
            modelBuilder.Entity<Models.Task>()
                .HasOne(x => x.User)            // task     has 1..0    user
                .WithMany(x => x.Tasks)         // user     has 0..*    tasks
                .HasForeignKey(x => x.UserId);                  // task     has FK on   UserId
        }
    }
}
