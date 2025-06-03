using CasinoAPI.Data;
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
            var tranzactii = _context.Tranzactii.Where(t => t.UserId == userId).ToList();
            return Ok(tranzactii);
        }

        [Authorize]
        [HttpPost]
        public IActionResult AdaugaTranzactie(Tranzactie tranzactie)
        {
            tranzactie.Data = DateTime.Now;
            _context.Tranzactii.Add(tranzactie);
            _context.SaveChanges();
            return Ok(tranzactie);
        }
    }
}
