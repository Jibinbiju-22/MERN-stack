import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconUrl from './pointer.jpg';

const MapComponent = (props) => {
  const customIcon = L.icon({
    iconUrl: markerIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={[props.latitude, props.longitude]}
        zoom={17}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marker with custom icon */}
        <Marker position={[props.latitude, props.longitude]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;


