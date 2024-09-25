using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoApp.Server.Data;
using TodoApp.Server.Models;
using TodoApp.Server.Repositories;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
  private readonly string _key;
  private readonly IUserRepository _repository;

  public AuthController(IConfiguration configuration, IUserRepository repository)
  {
    _key = configuration.GetSection("AppSettings:Token").Value;
    _repository = repository;
  }

  [HttpPost("login")]
  public IActionResult Login([FromBody] LoginRequest loginRequest)
  {
    if (loginRequest.Username == null || loginRequest.Password == null)
    {
      return BadRequest();
    }

    User user = _repository.Get(loginRequest.Username);

    if (user == null || user.Password != loginRequest.Password)
    {
      return Unauthorized();
    }

    var token = GenerateJwtToken(loginRequest.Username);
    return Ok(new { Token = token });
  }

  [HttpPost("register")]
  public IActionResult Register([FromBody] LoginRequest registerRequest)
  {
    if (registerRequest.Username == null || registerRequest.Password == null)
    {
      return BadRequest();
    }

    if (_repository.Get(registerRequest.Username) != null)
    {
      return Conflict();
    }

    // It's clearly not safe to store passwords as plain text, but for the sake of simplicity we'll do it this way
    _repository.Create(new User { Username = registerRequest.Username, Password = registerRequest.Password });
    _repository.SaveChanges();

    var token = GenerateJwtToken(registerRequest.Username);
    return Ok(new { Token = token });
  }

  private string GenerateJwtToken(string username)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(_key);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(new[]
        {
          new Claim(ClaimTypes.Name, username)
        }),
      Expires = DateTime.UtcNow.AddHours(1),
      SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
      Issuer = "http://localhost",
      Audience = "http://localhost"
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
  }
}

public class LoginRequest
{
  public string Username { get; set; }
  public string Password { get; set; }
}
