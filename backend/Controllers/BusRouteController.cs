using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/routes")]
    public class BusRouteController : ControllerBase
    {
        private readonly AppDbContext _db;

        public BusRouteController(AppDbContext db)
        {
            _db = db;
        }

        // GET: /api/routes
        [HttpGet]
        public async Task<IActionResult> GetRoutes()
        {
            var routes = await _db.BusRoutes.ToListAsync();
            return Ok(routes);
        }

        // GET: /api/routes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoute(Guid id)
        {
            var route = await _db.BusRoutes.FindAsync(id);
            if (route == null) return NotFound();
            return Ok(route);
        }

        // POST: /api/routes
        [HttpPost]
        public async Task<IActionResult> AddRoute(BusRouteDto dto)
        {
            var route = new BusRoute
            {
                Id = Guid.NewGuid(),
                RouteName = dto.RouteName,
                StartLocation = dto.StartLocation,
                EndLocation = dto.EndLocation,
                PathJson = dto.PathJson,
                BusId = dto.BusId
            };

            _db.BusRoutes.Add(route);
            await _db.SaveChangesAsync();
            return Ok(route);
        }

        // PUT: /api/routes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoute(Guid id, BusRouteDto dto)
        {
            var route = await _db.BusRoutes.FindAsync(id);
            if (route == null) return NotFound();

            route.RouteName = dto.RouteName;
            route.StartLocation = dto.StartLocation;
            route.EndLocation = dto.EndLocation;
            route.PathJson = dto.PathJson;
            route.BusId = dto.BusId;

            await _db.SaveChangesAsync();
            return Ok(route);
        }

        // DELETE: /api/routes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoute(Guid id)
        {
            var route = await _db.BusRoutes.FindAsync(id);
            if (route == null) return NotFound();

            _db.BusRoutes.Remove(route);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
