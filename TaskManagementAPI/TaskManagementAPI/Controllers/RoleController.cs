using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using TaskManagementAPI.Models.Dto;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Administrator")]
    public class RoleController : Controller
    {
        private readonly AppDbContext _context;
        private ResponseDto _response;

        public RoleController(AppDbContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet("GetRoles")]
        public ResponseDto GetRoles()
        {
            try
            {
                IEnumerable<Role> roles = _context.Roles.ToList();
                _response.Data = roles;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpGet("GetRole/{id}")]
        public ResponseDto GetRoleById(Guid id)
        {
            try
            {
                var role = _context.Roles.FirstOrDefault(r => r.Id == id);
                _response.Data = role;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPost("PostRole")]
        public ResponseDto PostRole([FromBody] Role role)
        {
            try
            {
                _context.Roles.Add(role);
                _context.SaveChanges();

                _response.Data = role;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPut("PutRole")]
        public ResponseDto PutRole([FromBody] Role role)
        {
            try
            {
                _context.Roles.Update(role);
                _context.SaveChanges();

                _response.Data = role;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpDelete("DeleteRole/{id}")]
        public ResponseDto DeleteRoleById(Guid id)
        {
            try
            {
                var role = _context.Roles.FirstOrDefault(r => r.Id == id);
                if (role != null)
                {
                    _context.Roles.Remove(role);
                    _context.SaveChanges();
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Role not found";
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
