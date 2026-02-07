using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Hubs;
using backend.Dtos;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusLocationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<BusHub> _hub;

        public BusLocationController(AppDbContext context, IHubContext<BusHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpPost("location")]
        public async Task<IActionResult> UpdateLocation(LiveLocationDto dto)
        {
            var bus = await _context.Buses.FindAsync(dto.BusId);
            if (bus == null) return NotFound();

            bus.Latitude = dto.Latitude;
            bus.Longitude = dto.Longitude;
            bus.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Broadcast to all clients (you can add route-based grouping later)
            await _hub.Clients.All.SendAsync("ReceiveBusLocation",
                bus.Id,
                bus.Latitude,
                bus.Longitude
            );

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var buses = await _context.Buses.ToListAsync();
            return Ok(buses);
        }
    }
}
