using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using TaskManagementAPI.Models.Dto;
using TaskManagementAPI.Services;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EncryptMD5Service _encryptMD5Service;
        private ResponseDto _response;

        public UserController(AppDbContext context, EncryptMD5Service encryptMD5Service)
        {
            _context = context;
            _encryptMD5Service = encryptMD5Service;
            _response = new ResponseDto();
        }

        [HttpGet("GetUsers")]
        [Authorize(Roles = "Administrator,Supervisor")]
        public ResponseDto GetUsers()
        {
            try
            {
                var users = _context.Users.ToList();
                if (users == null || !users.Any())
                {
                    _response.IsSuccess = false;
                    _response.Message = "No users found.";
                }
                else
                {
                    _response.Data = users;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpGet("GetUser/{id}")]
        [Authorize(Roles = "Administrator, Supervisor")]
        public ResponseDto GetUserById(Guid id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    _response.IsSuccess = false;
                    _response.Message = "User not found.";
                }
                else
                {
                    _response.Data = user;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPost("PostUser")]
        //[Authorize(Roles = "Administrator")]
        public ResponseDto PostUser([FromBody] User register)
        {
            try
            {
                if (register == null)
                {
                    _response.IsSuccess = false;
                    _response.Message = "User data is null.";
                    return _response;
                }

                var user = new User
                {
                    Id = register.Id,
                    Email = register.Email,
                    PasswordHash = _encryptMD5Service.Encrypt(register.PasswordHash),
                    Name = register.Name,
                    RoleId = register.RoleId,
                    CreateBy = register.CreateBy,
                    CreateDate = register.CreateDate,
                };

                _context.Users.Add(user);
                _context.SaveChanges();
                _response.Data = user;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPut("PutUser")]
        [Authorize(Roles = "Administrator")]
        public ResponseDto PutUser([FromBody] User user)
        {
            try
            {
                if (user == null)
                {
                    _response.IsSuccess = false;
                    _response.Message = "User data is null.";
                    return _response;
                }

                var existingUser = _context.Users.FirstOrDefault(u => u.Id == user.Id);
                if (existingUser == null)
                {
                    _response.IsSuccess = false;
                    _response.Message = "User not found.";
                    return _response;
                }

                _context.Users.Update(user);
                _context.SaveChanges();
                _response.Data = user;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpDelete("DeleteUser/{id}")]
        [Authorize(Roles = "Administrator")]
        public ResponseDto DeleteUserById(Guid id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    _response.IsSuccess = false;
                    _response.Message = "User not found.";
                    return _response;
                }

                _context.Users.Remove(user);
                _context.SaveChanges();
                _response.Message = "User deleted successfully.";
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpGet("GetTasksByUser/{userId}")]
        [Authorize(Roles = "Administrator,Empleado,Supervisor")]
        public ResponseDto GetTasksByUser(Guid userId)
        {
            try
            {
                var tasks = _context.Tasks.Where(t => t.UserId == userId).ToList();

                if (tasks == null || !tasks.Any())
                {
                    _response.IsSuccess = false;
                    _response.Message = "No tasks found for this user.";
                }
                else
                {
                    _response.Data = tasks;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }
    }
}
