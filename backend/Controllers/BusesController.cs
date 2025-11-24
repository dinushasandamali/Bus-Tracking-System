using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusesController : ControllerBase
    {
        private readonly AppDbContext _db;
        public BusesController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/buses
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var buses = await _db.Buses.ToListAsync();
            return Ok(buses);
        }

        // GET: api/buses/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var bus = await _db.Buses.FindAsync(id);
            if (bus == null) return NotFound();
            return Ok(bus);
        }

        // POST: api/buses
        [Authorize] // remove if you want public
        [HttpPost]
        public async Task<IActionResult> Create(CreateBusDto dto)
        {
            var bus = new Bus
            {
                Id = Guid.NewGuid(),
                RegistrationNumber = dto.RegistrationNumber,
                Capacity = dto.Capacity,
                Description = dto.Description
            };

            _db.Buses.Add(bus);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = bus.Id }, bus);
        }

        // PUT: api/buses/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateBusDto dto)
        {
            var bus = await _db.Buses.FindAsync(id);
            if (bus == null) return NotFound();

            bus.RegistrationNumber = dto.RegistrationNumber;
            bus.Capacity = dto.Capacity;
            bus.Description = dto.Description;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/buses/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var bus = await _db.Buses.FindAsync(id);
            if (bus == null) return NotFound();

            _db.Buses.Remove(bus);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
