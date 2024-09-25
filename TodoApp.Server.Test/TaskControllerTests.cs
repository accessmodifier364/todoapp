using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http.Json;
using SystemTask = System.Threading.Tasks.Task;
using Task = TodoApp.Server.Models.Task;
using TodoApp.Server.Data;
using System.Net.Http.Headers;

namespace TodoApp.Server.Test;

public class TaskControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> factory;

    public TaskControllerTests(WebApplicationFactory<Program> factory)
    {
        this.factory = factory;
    }

    private class TokenResponse
    {
        public required string Token { get; set; }
    }

    [Fact]
    public async SystemTask GetTask_ReturnsTaskDetails()
    {
        var client = await CreateClient();

        var response = await client.GetAsync("/api/tasks/1");

        response.EnsureSuccessStatusCode();
        var task = await response.Content.ReadFromJsonAsync<Task>();
        Assert.NotNull(task);
        Assert.Equal(1, task.TaskId);
        Assert.Equal("Implement User Authentication", task.Title);
    }

    [Fact]
    public async SystemTask PostTask_CreatesNewTask()
    {
        var client = await CreateClient();

        var newTask = new Task
        {
            Title = "Write Integration Tests",
            Description = "Write integration tests for the task API",
            DueDate = DateTime.Now.AddDays(5),
            IsCompleted = false
        };

        var response = await client.PostAsJsonAsync("/api/tasks", newTask);

        response.EnsureSuccessStatusCode();
        var createdTask = await response.Content.ReadFromJsonAsync<Task>();
        Assert.NotNull(createdTask);
        Assert.Equal("Write Integration Tests", createdTask.Title);
    }

    [Fact]
    public async SystemTask PutTask_UpdatesExistingTask()
    {
        var client = await CreateClient();

        var updatedTask = new Task
        {
            TaskId = 1,
            Title = "Updated Task Title",
            Description = "Updated Task Description",
            DueDate = DateTime.Now.AddDays(10),
            IsCompleted = true
        };

        var content = JsonContent.Create(updatedTask);

        var response = await client.PutAsync("/api/tasks/1", content);

        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);

        var updatedResponse = await client.GetAsync("/api/tasks/1");
        updatedResponse.EnsureSuccessStatusCode();

        var task = await updatedResponse.Content.ReadFromJsonAsync<Task>();
        Assert.NotNull(task);
        Assert.Equal("Updated Task Title", task.Title);
        Assert.Equal("Updated Task Description", task.Description);
        Assert.True(task.IsCompleted);
    }

    [Fact]
    public async SystemTask DeleteTask_DeletesTask()
    {
        var client = await CreateClient();

        var response = await client.DeleteAsync("/api/tasks/1");

        response.EnsureSuccessStatusCode();

        var deletedResponse = await client.GetAsync("/api/tasks/1");
        Assert.Equal(HttpStatusCode.NotFound, deletedResponse.StatusCode);
    }

    private class TokenBearer
    {
        public required string token { get; set; }
    }

    private async Task<HttpClient> CreateClient()
    {
        var client = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<ApplicationContext>));
                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<ApplicationContext>(options =>
                    options.UseInMemoryDatabase("TaskDB"));

                using (var scope = services.BuildServiceProvider().CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

                    SeedDatabase(context);
                }
            });
        }).CreateClient();

        var token = await client.PostAsJsonAsync("/api/auth/register", new { username = "admin", password = "admin" });
        var tokenContent = await token.Content.ReadFromJsonAsync<TokenBearer>();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenContent.token);

        return client;
    }

    private void SeedDatabase(ApplicationContext context)
    {
        context.Database.EnsureDeleted();

        var tasks = new Task[]
        {
            new Task { TaskId = 1, Title = "Implement User Authentication", Description = "Set up user authentication and authorization.", DueDate = DateTime.Now.AddDays(1), IsCompleted = false },
            new Task { TaskId = 2, Title = "Design Landing Page", Description = "Design the landing page.", DueDate = DateTime.Now.AddDays(3), IsCompleted = false }
        };

        context.Tasks.AddRange(tasks);
        context.SaveChanges();

        context.Database.EnsureCreated();
    }
}
