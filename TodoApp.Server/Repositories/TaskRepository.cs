using TodoApp.Server.Data;

namespace TodoApp.Server.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly ApplicationContext _context;

    public TaskRepository(ApplicationContext context) => _context = context;

    void ITaskRepository.Create(Models.Task task)
    {
        _context.Tasks.Add(task);
    }

    Models.Task ITaskRepository.Get(int id)
    {
        return _context.Tasks.Find(id);
    }

    IEnumerable<Models.Task> ITaskRepository.GetAll()
    {
        return _context.Tasks.ToList();
    }

    void ITaskRepository.Update(Models.Task task)
    {
        _context.Tasks.Update(task);
    }

    void ITaskRepository.Delete(Models.Task task)
    {
        _context.Tasks.Remove(task);
    }

    void ITaskRepository.SaveChanges()
    {
        _context.SaveChanges();
    }
}