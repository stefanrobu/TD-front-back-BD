using System;

namespace CasinoAPI.Models
{
    public class Pariu
    {
        public int Id { get; set; }                 // corespunde IDPariu
        public int UserId { get; set; }             // corespunde IDUtilizator
        public int JocId { get; set; }              // corespunde IDJoc
        public decimal SumaPariata { get; set; }
        public decimal SumaCastigata { get; set; }
        public DateTime DataPariu { get; set; }

        // Relații
        public User User { get; set; }
        public Joc Joc { get; set; }
    }
}
