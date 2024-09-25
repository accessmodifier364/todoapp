namespace TodoApp.Server.Models;

public class Task
{
    public int TaskId { get; set; }
    public required string Title { get; set; }
    public string Description { get; set; } // Description should be optional
    public required DateTime DueDate { get; set; }
    public required bool IsCompleted { get; set; }
}