using CasinoAPI.Data;
using CasinoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public IActionResult GetJocuri()
        {
            return Ok(_context.Jocuri.ToList());
        }

        [Authorize]
        [HttpPost]
        public IActionResult AdaugaJoc(Joc joc)
        {
            _context.Jocuri.Add(joc);
            _context.SaveChanges();
            return Ok(joc);
        }
    }
}
