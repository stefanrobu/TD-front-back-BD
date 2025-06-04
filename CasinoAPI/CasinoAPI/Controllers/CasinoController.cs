using CasinoAPI.Data;
using CasinoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using CasinoAPI.Dtos;

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

        [Authorize]
        [HttpPost("play")]
        public async Task<IActionResult> Play([FromBody] decimal sumaPariata)
        {
            if (sumaPariata <= 0)
                return BadRequest("Suma pariată trebuie să fie mai mare decât 0.");

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return Unauthorized();

            if (user.Sold < sumaPariata)
                return BadRequest("Fonduri insuficiente.");

            // Logica jocului
            user.Sold -= sumaPariata;

            decimal castig = 0;
            bool aCastigat = false;
            int sansa = _random.Next(1, 101); // 1..100

            if (sansa <= 30) // 30% șansă să câștige
            {
                aCastigat = true;
                int multiplu = _random.Next(2, 11);
                castig = sumaPariata * multiplu;
                user.Sold += castig;
            }

            // Creăm tranzacția corespunzătoare
            var tranzactie = new Tranzactie
            {
                UserId = userId,
                DataTranzactie = DateTime.UtcNow,
                Suma = aCastigat ? castig : -sumaPariata,
                TipTranzactie = aCastigat ? "castig" : "P=pierdere"
            };

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                _context.Tranzactii.Add(tranzactie);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "A apărut o eroare la procesarea jocului.");
            }

            return Ok(new
            {
                castig,
                soldCurent = user.Sold,
                rezultat = aCastigat ? "Ai câștigat!" : "Ai pierdut."
            });
        }
        [Authorize]
        [HttpPost("retragere")]
        public IActionResult RetrageBani([FromBody] RetragereDto dto)
        {
            if (dto.Suma <= 0)
                return BadRequest(new { message = "Suma trebuie să fie pozitivă." });

            //if (string.IsNullOrWhiteSpace(dto.CardId) || dto.CardId.Length < 4)
               // return BadRequest(new { message = "ID Card invalid." });

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "Utilizatorul nu există." });

            if (user.Sold < dto.Suma)
                return BadRequest(new { message = "Fonduri insuficiente." });

            // Scădem suma
            user.Sold -= dto.Suma;

            // Adăugăm tranzacție
            var tranzactie = new Tranzactie
            {
                UserId = userId,
                Suma = dto.Suma,
                TipTranzactie = "retragere",
                DataTranzactie = DateTime.UtcNow
            };

            _context.Tranzactii.Add(tranzactie);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Retragere efectuată cu succes.",
                soldNou = user.Sold
            });
        }

        [Authorize]
        [HttpPost("depunere")]
        public IActionResult DepuneBani([FromBody] decimal suma)
        {
            if (suma <= 0)
                return BadRequest(new { message = "Suma trebuie să fie pozitivă." });

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "Utilizatorul nu există." });

            user.Sold += suma;

            var tranzactie = new Tranzactie
            {
                UserId = userId,
                Suma = suma,
                TipTranzactie = "depunere",
                DataTranzactie = DateTime.UtcNow
            };

            _context.Tranzactii.Add(tranzactie);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Depunere efectuată cu succes.",
                soldNou = user.Sold
            });
        }


        [Authorize]
        [HttpGet("tranzactii")]
        public async Task<IActionResult> GetTranzactii()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var tranzactii = await _context.Tranzactii
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.DataTranzactie)
                .Select(t => new
                {
                    t.IDTranzactie,
                    t.DataTranzactie,
                    t.Suma,
                    t.TipTranzactie
                })
                .ToListAsync();

            return Ok(tranzactii);
        }

        [Authorize]
        [HttpGet("profit-pierderi")]
        public async Task<IActionResult> GetProfitPierderi()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var tranzactii = _context.Tranzactii.Where(t => t.UserId == userId);

            var totalDepuneri = await tranzactii
                .Where(t => t.TipTranzactie == "depunere")
                .SumAsync(t => t.Suma);

            var totalCastiguri = await tranzactii
                .Where(t => t.TipTranzactie == "castig")
                .SumAsync(t => t.Suma);

            var totalPierderi = await tranzactii
                .Where(t => t.TipTranzactie == "pierdere")
                .SumAsync(t => t.Suma);

            var profitNet = totalCastiguri + totalPierderi; // pierderile sunt negative

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
