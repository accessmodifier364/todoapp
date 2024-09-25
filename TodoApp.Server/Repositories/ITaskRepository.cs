namespace TodoApp.Server.Repositories;

public interface ITaskRepository
{
    IEnumerable<Models.Task> GetAll();

    Models.Task Get(int id);

    void Create(Models.Task task);

    void Update(Models.Task task);

    void Delete(Models.Task task);

    void SaveChanges();
}