using TodoApp.Server.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace TodoApp.Server.Controllers;

[ApiController]
[Route("api/tasks")]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly ITaskRepository _repository;

    public TaskController(ITaskRepository repository) => _repository = repository;

    [HttpPost]
    public IActionResult CreateTask(Models.Task task)
    {
        if (task == null)
        {
            return BadRequest();
        }

        _repository.Create(task);
        _repository.SaveChanges();

        return CreatedAtAction(nameof(GetTask), new { id = task.TaskId }, task);
    }

    [HttpGet("{id}")]
    public IActionResult GetTask(int id)
    {
        var task = _repository.Get(id);

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(_repository.GetAll());
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, Models.Task task)
    {
        if (task == null || id != task.TaskId)
        {
            return BadRequest();
        }

        var existingTask = _repository.Get(id);
        if (existingTask == null)
        {
            return NotFound("Task not found");
        }

        existingTask.Title = task.Title;
        existingTask.Description = task.Description;
        existingTask.DueDate = task.DueDate;
        existingTask.IsCompleted = task.IsCompleted;

        _repository.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = _repository.Get(id);

        if (task == null)
        {
            return NotFound();
        }

        _repository.Delete(task);
        _repository.SaveChanges();
        return NoContent();
    }
}