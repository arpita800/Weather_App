using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MajorApi.Model;

namespace MajorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly WhetherDbContext _context;

        public AdminsController(WhetherDbContext context)
        {
            _context = context;
        }

        // GET: api/Admins
        [HttpGet("{email}/{pass}")]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins(string email, string pass)
        {
            if(email == null || pass == null)
            {
                 return NotFound();
            }
             var admin = _context.Admins.Where(e => e.Email.Equals(email) & e.Password.Equals(pass));
            if(admin == null)
            {
                return NotFound();
            }
            if(admin.Count() == 0)
            {
                return Ok();
            }
            return Ok(admin);
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }

     
    }
}
