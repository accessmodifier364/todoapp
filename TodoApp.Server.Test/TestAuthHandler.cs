using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public class TestAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
  public TestAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options,
                         ILoggerFactory logger,
                         UrlEncoder encoder,
                         ISystemClock clock)
      : base(options, logger, encoder, clock)
  { }

  protected override Task<AuthenticateResult> HandleAuthenticateAsync()
  {
    var claims = new[] { new Claim(ClaimTypes.Name, "testuser") };
    var identity = new ClaimsIdentity(claims, "TestAuth");
    var principal = new ClaimsPrincipal(identity);
    var ticket = new AuthenticationTicket(principal, "TestScheme");

    return Task.FromResult(AuthenticateResult.Success(ticket));
  }
}
