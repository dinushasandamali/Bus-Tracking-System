using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class BusHub : Hub
    {
        public async Task JoinRoute(Guid routeId)
        {
            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                $"route-{routeId}"
            );
        }
    }
}
