using TodoApp.Server.Data;
using TodoApp.Server.Models;

namespace TodoApp.Server.Repositories;

public class UserRepository : IUserRepository
{
  private readonly ApplicationContext _context;

  public UserRepository(ApplicationContext context) => _context = context;

  void IUserRepository.Create(User user)
  {
    _context.Users.Add(user);
  }

  User IUserRepository.Get(string username)
  {
    return _context.Users.Find(username);
  }

  void IUserRepository.Delete(User user)
  {
    _context.Users.Remove(user);
  }

  public void SaveChanges()
  {
    _context.SaveChanges();
  }
}