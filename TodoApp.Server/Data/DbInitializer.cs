using TodoApp.Server.Models;

namespace TodoApp.Server.Data;

public static class DbInitializer
{
    public static void Initialize(ApplicationContext context)
    {
        if (context.Tasks.Any())
        {
            return;
        }

        // Create mock data
        var tasks = new Models.Task[] {
            new Models.Task { TaskId = 1, Title = "Implement User Authentication", Description = "Set up user authentication and authorization for the application.", DueDate = DateTime.Now.AddDays(3), IsCompleted = false },
            new Models.Task { TaskId = 2, Title = "Design Landing Page", Description = "Create a responsive design for the landing page.", DueDate = DateTime.Now.AddDays(7), IsCompleted = false },
            new Models.Task { TaskId = 3, Title = "Database Optimization", Description = "Optimize database queries to improve application performance.", DueDate = DateTime.Now.AddDays(10), IsCompleted = false },
            new Models.Task { TaskId = 4, Title = "Write Unit Tests for API", Description = "Create unit tests for the API endpoints using xUnit.", DueDate = DateTime.Now.AddDays(14), IsCompleted = false },
        };

        context.Tasks.AddRange(tasks);
        context.SaveChanges();

    }
}
