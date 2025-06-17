using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api_avaliacao.Models;

namespace api_avaliacao.Controllers;

  [ApiController]
  [Route("api/auth")]
  public class AuthController : ControllerBase
  {
      private readonly IConfiguration _configuration;

      public AuthController(IConfiguration configuration)
      {
          _configuration = configuration;
      }

      private static List<Usuario> usuarios = new()
      {
          new Usuario { UsuarioId = 1, Email = "admin@empresa.com", Senha = "123456", Role = Role.admin },
          new Usuario { UsuarioId = 2, Email = "usuario@empresa.com", Senha = "123456", Role = Role.user }
      };

      [HttpPost("login")]
      public IActionResult Login([FromBody] Usuario credenciais)
      {
          var usuario = usuarios.FirstOrDefault(u =>
              u.Email == credenciais.Email && u.Senha == credenciais.Senha);

          if (usuario == null)
              return Unauthorized(new { mensagem = "Credenciais inválidas" });

          var token = GerarToken(usuario);
          return Ok(new { token });
      }

      private string GerarToken(Usuario usuario)
      {
          var claims = new[]
          {
              new Claim(ClaimTypes.Name, usuario.Email),
              new Claim(ClaimTypes.Role, usuario.Role.ToString())
          };

          var chave = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!);
          var credenciais = new SigningCredentials(
              new SymmetricSecurityKey(chave), SecurityAlgorithms.HmacSha256);

          var token = new JwtSecurityToken(
              claims: claims,
              expires: DateTime.UtcNow.AddHours(1),
              signingCredentials: credenciais);

          return new JwtSecurityTokenHandler().WriteToken(token);
      }
  }