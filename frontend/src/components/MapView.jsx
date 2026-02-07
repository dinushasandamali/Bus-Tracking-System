import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../api/api";

// Fix Leaflet icons (Vite)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

export default function MapView() {
  const [buses, setBuses] = useState([]);
  const center = [6.9271, 79.8612]; // Colombo

  useEffect(() => {
    // 1️⃣ Load initial bus locations
    api.get("/buses").then(res => setBuses(res.data));

    // 2️⃣ Connect SignalR
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5021/busHub")
      .withAutomaticReconnect()
      .build();

    connection.start().then(() => {
      console.log("SignalR connected");
    });

    // 3️⃣ Listen for live updates
    connection.on("ReceiveBusLocation", (busId, lat, lng) => {
      setBuses(prev =>
        prev.map(bus =>
          bus.id === busId
            ? { ...bus, latitude: lat, longitude: lng }
            : bus
        )
      );
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <MapContainer center={center} zoom={12} className="h-[400px] w-full rounded-xl">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {buses.map(bus =>
        bus.latitude && bus.longitude ? (
          <Marker
            key={bus.id}
            position={[bus.latitude, bus.longitude]}
          >
            <Popup>
              <strong>{bus.registrationNumber}</strong><br />
              Capacity: {bus.capacity}<br />
              {bus.description}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
