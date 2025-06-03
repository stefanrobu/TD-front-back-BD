using Microsoft.EntityFrameworkCore;
using CasinoAPI.Models;

namespace CasinoAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Joc> Jocuri { get; set; }
        public DbSet<Tranzactie> Tranzactii { get; set; }
    }
}
