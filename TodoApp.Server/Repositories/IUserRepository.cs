using TodoApp.Server.Models;

namespace TodoApp.Server.Repositories;

public interface IUserRepository
{
  void Create(User user);

  User Get(string username);

  void Delete(User user);

  void SaveChanges();
}