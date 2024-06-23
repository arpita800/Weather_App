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
    public class WeatherDatumsController : ControllerBase
    {
        private readonly WhetherDbContext _context;

        public WeatherDatumsController(WhetherDbContext context)
        {
            _context = context;
        }

        // GET: api/WeatherDatums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherDatum>>> GetWeatherData()
        {
            return await _context.WeatherData.ToListAsync();
        }

        // GET: api/WeatherDatums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherDatum>> GetWeatherDatum(int id)
        {
            var weatherDatum = await _context.WeatherData.FindAsync(id);

            if (weatherDatum == null)
            {
                return NotFound();
            }

            return weatherDatum;
        }

        // PUT: api/WeatherDatums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeatherDatum(int id, WeatherDatum weatherDatum)
        {
            if (id != weatherDatum.WeatherId)
            {
                return BadRequest();
            }

            _context.Entry(weatherDatum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeatherDatumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WeatherDatums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WeatherDatum>> PostWeatherDatum(WeatherDatum weatherDatum)
        {
            _context.WeatherData.Add(weatherDatum);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WeatherDatumExists(weatherDatum.WeatherId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWeatherDatum", new { id = weatherDatum.WeatherId }, weatherDatum);
        }

        // DELETE: api/WeatherDatums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeatherDatum(int id)
        {
            var weatherDatum = await _context.WeatherData.FindAsync(id);
            if (weatherDatum == null)
            {
                return NotFound();
            }

            _context.WeatherData.Remove(weatherDatum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeatherDatumExists(int id)
        {
            return _context.WeatherData.Any(e => e.WeatherId == id);
        }
    }
}
