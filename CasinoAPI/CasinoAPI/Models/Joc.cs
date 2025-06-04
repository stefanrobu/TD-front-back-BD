using CasinoAPI.Models;

public class Joc
{
    public int IDJoc { get; set; }
    public string NumeJoc { get; set; }
    public string TipJoc { get; set; }
    public decimal PariuMinim { get; set; }
    public decimal PariuMaxim { get; set; }

    public ICollection<Pariu> Pariuri { get; set; } = new List<Pariu>();
}
