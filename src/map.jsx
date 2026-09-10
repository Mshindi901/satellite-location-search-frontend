import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issues in Leaflet with React/Webpack/Vite
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function SatelliteMap({ satelliteData }) {
  if (!satelliteData) return <p>No map data available.</p>;

  const { location, tile_url } = satelliteData;
  const position = [location.latitude, location.longitude];

  return (
    <div style={{ height: '600px', width: '100%', overflow: 'hidden', background: '#0f172a' }}>
      <MapContainer 
        center={position} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* Base Map (OpenStreetMap) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Satellite Imagery Overlay from Backend */}
        {tile_url && (
          <TileLayer
            url={tile_url}
            attribution="Microsoft Planetary Computer"
            maxZoom={18}
          />
        )}

        <Marker position={position}>
          <Popup>{location.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}