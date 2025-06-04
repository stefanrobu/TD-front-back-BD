using CasinoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CasinoAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Joc> Jocuri { get; set; }
        public DbSet<Pariu> Pariuri { get; set; }
        public DbSet<Tranzactie> Tranzactii { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapare tabel Users
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(u => u.Id);

                entity.Property(u => u.Id).HasColumnName("IDUtilizator");
                entity.Property(u => u.Username).HasColumnName("NumeUtilizator").HasMaxLength(50).IsRequired();
                entity.Property(u => u.Email).HasColumnName("EmailUser").HasMaxLength(100).IsRequired();
                entity.Property(u => u.PasswordHash).HasColumnName("ParolaUser").IsRequired();
                entity.Property(u => u.Sold).HasColumnName("Sold").HasColumnType("decimal(10,2)").HasDefaultValue(0.00m);
                entity.Property(u => u.DataInregistrare).HasColumnName("DataInregistrare").HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // Mapare tabel Jocuri
            modelBuilder.Entity<Joc>(entity =>
            {
                entity.ToTable("Jocuri");

                entity.HasKey(j => j.IDJoc);

                entity.Property(j => j.IDJoc).HasColumnName("IDJoc");
                entity.Property(j => j.NumeJoc).HasColumnName("NumeJoc").HasMaxLength(100).IsRequired();
                entity.Property(j => j.TipJoc).HasColumnName("TipJoc").HasMaxLength(50);
                entity.Property(j => j.PariuMinim).HasColumnName("PariuMinim").HasColumnType("decimal(10,2)");
                entity.Property(j => j.PariuMaxim).HasColumnName("PariuMaxim").HasColumnType("decimal(10,2)");
            });

            // Mapare tabel Pariuri
            modelBuilder.Entity<Pariu>(entity =>
            {
                entity.ToTable("Pariuri");

                entity.HasKey(p => p.Id);

                entity.Property(p => p.Id).HasColumnName("IDPariu");
                entity.Property(p => p.UserId).HasColumnName("IDUtilizator");
                entity.Property(p => p.JocId).HasColumnName("IDJoc");
                entity.Property(p => p.SumaPariata).HasColumnName("SumaPariata").HasColumnType("decimal(10,2)").IsRequired();
                entity.Property(p => p.SumaCastigata).HasColumnName("SumaCastigata").HasColumnType("decimal(10,2)").HasDefaultValue(0.00m);
                entity.Property(p => p.DataPariu).HasColumnName("DataPariu").HasDefaultValueSql("CURRENT_TIMESTAMP");

                // Relații FK
                entity.HasOne(p => p.User)
                      .WithMany(u => u.Pariuri)
                      .HasForeignKey(p => p.UserId);

                entity.HasOne(p => p.Joc)
                      .WithMany(j => j.Pariuri)
                      .HasForeignKey(p => p.JocId);
            });

            // Mapare tabel Tranzactii
            modelBuilder.Entity<Tranzactie>(entity =>
            {
                entity.ToTable("Tranzactii");

                entity.HasKey(t => t.IDTranzactie);

                entity.Property(t => t.IDTranzactie).HasColumnName("IDTranzactie");
                entity.Property(t => t.UserId).HasColumnName("IDUtilizator");
                entity.Property(t => t.Suma).HasColumnName("Suma").HasColumnType("decimal(10,2)").IsRequired();
                entity.Property(t => t.TipTranzactie).HasColumnName("TipTranzactie").HasMaxLength(20);
                entity.Property(t => t.DataTranzactie).HasColumnName("DataTranzactie").HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(t => t.User)
                      .WithMany(u => u.Tranzactii)
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
