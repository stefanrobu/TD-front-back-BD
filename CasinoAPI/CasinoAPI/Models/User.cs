using System.ComponentModel.DataAnnotations;

namespace CasinoAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public decimal Sold { get; set; }
        public DateTime DataInregistrare { get; set; }
        public ICollection<Pariu> Pariuri { get; set; } = new List<Pariu>();
        public ICollection<Tranzactie> Tranzactii { get; set; } = new List<Tranzactie>();
    }
}
