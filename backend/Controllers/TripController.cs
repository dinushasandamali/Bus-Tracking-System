using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/trips")]
    public class TripController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TripController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var trips = await _context.Trips
                .Include(t => t.BusRoute)
                .Include(t => t.Bus)
                .Include(t => t.Locations)
                .ToListAsync();
            return Ok(trips);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Trip trip)
        {
            trip.Id = Guid.NewGuid();
            trip.Status = TripStatus.Scheduled;
            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();
            return Ok(trip);
        }

        [HttpPut("{id}/start")]
        public async Task<IActionResult> StartTrip(Guid id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip == null) return NotFound();
            trip.StartTime = DateTime.UtcNow;
            trip.Status = TripStatus.Ongoing;
            await _context.SaveChangesAsync();
            return Ok(trip);
        }

        [HttpPut("{id}/end")]
        public async Task<IActionResult> EndTrip(Guid id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip == null) return NotFound();
            trip.EndTime = DateTime.UtcNow;
            trip.Status = TripStatus.Completed;
            await _context.SaveChangesAsync();
            return Ok(trip);
        }
    }
}
