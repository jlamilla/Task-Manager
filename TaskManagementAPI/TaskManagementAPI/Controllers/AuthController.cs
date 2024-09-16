using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using TaskManagementAPI.Models.Dto;
using TaskManagementAPI.Services;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EncryptMD5Service _encryptMD5Service;
        private readonly JwtTokenService _jwtTokenService;

        public AuthController(AppDbContext context, EncryptMD5Service encryptMD5Service, JwtTokenService jwtTokenService)
        {
            _context = context;
            _encryptMD5Service = encryptMD5Service;
            _jwtTokenService = jwtTokenService;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDto request)
        {
            string pass = _encryptMD5Service.Encrypt(request.PasswordHash);
            User? user = _context.Users.SingleOrDefault(u => u.Email == request.Email && u.PasswordHash == pass);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var token = _jwtTokenService.GenerateToken(user.Id, user.Email, user.RoleId.ToString());

            return Ok(new { token });
        }
    }
}
