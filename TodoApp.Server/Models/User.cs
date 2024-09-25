using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.Models;

public class User
{
  [Key]
  public required string Username { get; set; }
  public required string Password { get; set; }
}