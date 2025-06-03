using CasinoAPI.Data;
using CasinoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace CasinoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CasinoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Random _random = new Random();

        public CasinoController(AppDbContext context)
        {
            _context = context;
        }

        // POST api/casino/play
        [Authorize]
        [HttpPost("play")]
        public IActionResult Play([FromBody] decimal sumaPariata)
        {
            if (sumaPariata <= 0)
                return BadRequest("Suma pariată trebuie să fie mai mare decât 0.");

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return Unauthorized();

            if (user.Sold < sumaPariata)
                return BadRequest("Fonduri insuficiente.");

            // Scădem suma pariata din sold initial
            user.Sold -= sumaPariata;

            // Simulăm câștigul: 30% șansă să câștige, cu multipli între 2x și 10x suma pariată
            decimal castig = 0;
            bool aCastigat = false;
            int sansa = _random.Next(1, 101); // 1..100

            if (sansa <= 30) // 30% șansă
            {
                aCastigat = true;
                // multiplu câștig între 2 și 10
                int multiplu = _random.Next(2, 11);
                castig = sumaPariata * multiplu;
                user.Sold += castig;
            }

            // Salvăm tranzacția
            var tranzactie = new Tranzactie
            {
                UserId = userId,
                Data = DateTime.Now,
                Suma = aCastigat ? castig : -sumaPariata,
                Tip = aCastigat ? "Castig" : "Pierdere",
                SoldDupa = user.Sold
            };

            _context.Tranzactii.Add(tranzactie);
            _context.SaveChanges();

            return Ok(new
            {
                castig = castig,
                soldCurent = user.Sold,
                rezultat = aCastigat ? "Ai câștigat!" : "Ai pierdut."
            });
        }
        [Authorize]
        [HttpPost("depunere")]
        public async Task<IActionResult> Depunere([FromBody] decimal suma)
        {
            if (suma <= 0)
                return BadRequest("Suma trebuie să fie mai mare decât 0.");

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return Unauthorized();

            user.Sold += suma;

            var tranzactie = new Tranzactie
            {
                UserId = userId,
                Data = DateTime.Now,
                Suma = suma,
                Tip = "Depunere",
                SoldDupa = user.Sold
            };

            _context.Tranzactii.Add(tranzactie);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                soldCurent = user.Sold,
                mesaj = $"Depunere de {suma} realizată cu succes."
            });
        }

        [Authorize]
        [HttpGet("tranzactii")]
        public IActionResult GetTranzactii()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var tranzactii = _context.Tranzactii
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Data)
                .Select(t => new
                {
                    t.Id,
                    t.Data,
                    t.Suma,
                    t.Tip,
                    t.SoldDupa
                })
                .ToList();

            return Ok(tranzactii);
        }

        [Authorize]
        [HttpGet("profit-pierderi")]
        public IActionResult GetProfitPierderi()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var tranzactii = _context.Tranzactii.Where(t => t.UserId == userId);

            // Calculăm total depuneri (tip = "Depunere")
            var totalDepuneri = tranzactii
                .Where(t => t.Tip == "Depunere")
                .Sum(t => t.Suma);

            // Total castiguri
            var totalCastiguri = tranzactii
                .Where(t => t.Tip == "Castig")
                .Sum(t => t.Suma);

            // Total pierderi (notează că pierderile sunt negative în Suma)
            var totalPierderi = tranzactii
                .Where(t => t.Tip == "Pierdere")
                .Sum(t => t.Suma);

            // Profit net = castiguri + pierderi (pierderile fiind negative)
            var profitNet = totalCastiguri + totalPierderi;

            return Ok(new
            {
                totalDepuneri,
                totalCastiguri,
                totalPierderi,
                profitNet
            });
        }
    }
}
