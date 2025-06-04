using System;

namespace CasinoAPI.Models
{
    public class Tranzactie
    {
        public int IDTranzactie { get; set; }

        public int UserId { get; set; }  // FK legat de User.Id

        public decimal Suma { get; set; }

        public string TipTranzactie { get; set; }

        public DateTime DataTranzactie { get; set; }

        public User User { get; set; }  // navigare către User
    }
}
