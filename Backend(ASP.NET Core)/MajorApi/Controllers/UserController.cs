using MajorApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MajorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly WhetherDbContext context;

        public UserController(WhetherDbContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public IActionResult GetUserData()
        {
            var usr = context.Users.ToList();
            return Ok(usr);
        }
        [HttpPost("Register")]
        public IActionResult addUserDetails([FromBody] User user)
        {
            try
            {
                var userdetails = context.Users.Add(user);
                context.SaveChanges();
                return Ok(user);
            }
            catch (DbUpdateException ex)
            {
                // Log the exception details
                Console.WriteLine("Error occurred while saving to database:");
                Console.WriteLine(ex.ToString());

                // If you want to get the inner exception message:
                var message = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                return BadRequest($"An error occurred while saving the entity changes: {message}");
            }
            catch (Exception ex)
            {
                // Log the exception details
                Console.WriteLine(ex.ToString());
                return BadRequest("An unexpected error occurred.");
            }
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] User userLogin)
        {
            try
            {
                var user = context.Users.FirstOrDefault(u => u.Email == userLogin.Email);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                if (user.Password != userLogin.Password)
                {
                    return Unauthorized("Invalid password");
                }

                return Ok("Login successful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{Uid}")]
        public async Task<ActionResult<User>> GetUser(string Uid)
        {
            var User = context.Users.Where(u => u.Uid.Equals(Uid));

            if (User == null)
            {
                return NotFound();
            }

            return Ok(User);
        }

    }
    }
