using CasinoAPI.Data;
using CasinoAPI.Dtos;
using CasinoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CasinoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TranzactieController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TranzactieController(AppDbContext context)
        {
            _context = context;
        }

       
        [Authorize]
        [HttpGet]
        public IActionResult GetTranzactii()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            Console.WriteLine($"Fetching tranzactii for userId={userId}");

            var tranzactii = _context.Tranzactii
                .Where(t => t.UserId == userId)
                .ToList();

            Console.WriteLine($"Found {tranzactii.Count} tranzactii");
            return Ok(tranzactii);
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
        [HttpPost("retragere")]
        public IActionResult RetrageBani([FromBody] RetragereDto dto)
        {
            if (dto.Suma <= 0)
                return BadRequest(new { message = "Suma trebuie să fie pozitivă." });

            //if (string.IsNullOrWhiteSpace(dto.CardId) || dto.CardId.Length < 4)
                //return BadRequest(new { message = "ID Card invalid." });

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
        [HttpPost]
        public IActionResult AdaugaTranzactie([FromBody] TranzactieCreateDto dto)
        {
            if (dto.Suma <= 0)
                return BadRequest(new { message = "Suma trebuie să fie pozitivă." });

            if (dto.TipTranzactie != "depozit" && dto.TipTranzactie != "retragere")
                return BadRequest(new { message = "Tip tranzacție invalid." });

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var tranzactie = new Tranzactie
            {
                UserId = userId,
                Suma = dto.Suma,
                TipTranzactie = dto.TipTranzactie,
                DataTranzactie = DateTime.UtcNow
            };

            _context.Tranzactii.Add(tranzactie);
            _context.SaveChanges();

            return Ok(tranzactie);
        }
    }
}
