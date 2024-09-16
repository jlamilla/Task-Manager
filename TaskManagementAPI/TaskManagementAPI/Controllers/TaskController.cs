using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using TaskManagementAPI.Models.Dto;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly AppDbContext _context;
        private ResponseDto _response;

        public TaskController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
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

        [HttpGet("GetTasks")]
        [Authorize(Roles = "Administrator,Supervisor")]
        public ResponseDto GetTasks()
        {
            try
            {
                IEnumerable<Models.Task> tasks = _context.Tasks.ToList();
                _response.Data = tasks;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpGet("GetTask/{id}")]
        [Authorize(Roles = "Administrator,Supervisor")]
        public ResponseDto GetTaskById(Guid id)
        {
            try
            {
                var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
                _response.Data = task;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPost("PostTask")]
        [Authorize(Roles = "Administrator,Supervisor")]
        public ResponseDto PostTask([FromBody] Models.Task task)
        {
            try
            {
                _context.Tasks.Add(task);
                _context.SaveChanges();

                _response.Data = task;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPut("PutTask")]
        [Authorize(Roles = "Administrator,Supervisor")]
        public ResponseDto PutTask([FromBody] Models.Task task)
        {
            try
            {
                _context.Tasks.Update(task);
                _context.SaveChanges();

                _response.Data = task;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpDelete("DeleteTask/{id}")]
        [Authorize(Roles = "Administrator")]
        public ResponseDto DeleteTaskById(Guid id)
        {
            try
            {
                var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
                if (task != null)
                {
                    _context.Tasks.Remove(task);
                    _context.SaveChanges();
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Task not found";
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
