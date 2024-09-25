using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TodoApp.Server.Data;
using SystemTask = System.Threading.Tasks.Task;

namespace TodoApp.Server.Test;

public class AuthControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
  private readonly WebApplicationFactory<Program> factory;

  public AuthControllerTests(WebApplicationFactory<Program> factory)
  {
    this.factory = factory;
  }

  [Fact]
  public async SystemTask Login_ReturnsToken()
  {
    var client = CreateClient();
    var response = await client.PostAsJsonAsync("/api/auth/login", new { username = "admin", password = "admin" });
    response.EnsureSuccessStatusCode();
    var result = await response.Content.ReadAsStringAsync();
    Assert.Contains("token", result);
  }

  [Fact]
  public async SystemTask Register_ReturnsToken()
  {
    var client = CreateClient();
    var response = await client.PostAsJsonAsync("/api/auth/register", new { username = "user", password = "user" });
    response.EnsureSuccessStatusCode();
    var result = await response.Content.ReadAsStringAsync();
    Assert.Contains("token", result);
  }

  [Fact]
  public async SystemTask Register_ReturnsConflict()
  {
    var client = CreateClient();
    var first = await client.PostAsJsonAsync("/api/auth/register", new { username = "admin", password = "admin" });
    var second = await client.PostAsJsonAsync("/api/auth/register", new { username = "admin", password = "admin" });

    first.EnsureSuccessStatusCode();
    Assert.Equal(System.Net.HttpStatusCode.Conflict, second.StatusCode);
  }

  private HttpClient CreateClient()
  {
    return factory.WithWebHostBuilder(builder =>
    {
      builder.ConfigureServices(services =>
          {
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<ApplicationContext>));
            if (descriptor != null)
            {
              services.Remove(descriptor);
            }

            services.AddDbContext<ApplicationContext>(options =>
                    options.UseInMemoryDatabase("AuthDB"));

            using (var scope = services.BuildServiceProvider().CreateScope())
            {
              var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

              context.Database.EnsureCreated();
            }
          });
    }).CreateClient();
  }
}