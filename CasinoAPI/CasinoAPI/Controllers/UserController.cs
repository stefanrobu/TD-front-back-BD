using CasinoAPI.Data;
using CasinoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CasinoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // Get info user curent logat
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return NotFound();

            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Sold
            });
        }

        // Get toți userii (admin-only pe viitor)
        [Authorize]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.Select(u => new {
                u.Id,
                u.Username,
                u.Sold
            }).ToList();

            return Ok(users);
        }
        [Authorize]
        [HttpGet("/api/profile/sold")]
        public IActionResult GetSold()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return NotFound();

            return Ok(new { sold = user.Sold });
        }

        // Modificare sold user logat (adăugare sau scădere)
        [Authorize]
        [HttpPut("update-sold")]
        public async Task<IActionResult> UpdateSold([FromBody] decimal suma)
        {
            if (suma == 0)
                return BadRequest("Suma trebuie să fie diferită de zero.");

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound("Userul nu a fost găsit.");

            if (user.Sold + suma < 0)
                return BadRequest("Fonduri insuficiente pentru această operație.");

            user.Sold += suma;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                soldCurent = user.Sold,
                mesaj = $"Soldul a fost actualizat cu {suma}."
            });
        }
    }
}
