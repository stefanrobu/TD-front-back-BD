namespace CasinoAPI.Models
{
    public class Tranzactie
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime Data { get; set; }
        public decimal Suma { get; set; }
        public string Tip { get; set; }
        public decimal SoldDupa { get; set; }
    }
}
