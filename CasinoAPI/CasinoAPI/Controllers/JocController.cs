using CasinoAPI.Data;
using CasinoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace CasinoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JocController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JocController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/joc
        [HttpGet]
        public async Task<IActionResult> GetJocuri()
        {
            var jocuri = await _context.Jocuri
                .Select(j => new
                {
                    j.IDJoc,
                    j.NumeJoc,
                    j.TipJoc,
                    j.PariuMinim,
                    j.PariuMaxim
                })
                .ToListAsync();

            return Ok(jocuri);
        }

        // POST: api/joc
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AdaugaJoc([FromBody] Joc joc)
        {
            if (await _context.Jocuri.AnyAsync(j => j.NumeJoc == joc.NumeJoc))
                return BadRequest("Jocul există deja.");

            if (joc.PariuMinim < 0 || joc.PariuMaxim < 0 || joc.PariuMinim > joc.PariuMaxim)
                return BadRequest("Valori invalide pentru pariuri.");

            _context.Jocuri.Add(joc);
            await _context.SaveChangesAsync();

            return Ok(joc);
        }
    }
}
