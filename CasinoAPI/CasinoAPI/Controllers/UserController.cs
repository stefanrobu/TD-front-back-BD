using CasinoAPI.Data;
using CasinoAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        // Modificare sold user logat (depunere sau retragere)
        [Authorize]
        [HttpPost("update-sold")]
        public IActionResult UpdateSold([FromBody] decimal suma)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return NotFound();

            user.Sold += suma;
            _context.SaveChanges();

            return Ok(new { user.Sold });
        }
    }
}
