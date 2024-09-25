using Microsoft.EntityFrameworkCore;

namespace TodoApp.Server.Data;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
    }

    public DbSet<Models.Task> Tasks { get; set; }
    public DbSet<Models.User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Models.Task>().ToTable("Task");
        modelBuilder.Entity<Models.User>().ToTable("User");
    }
}