// map.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl        from "leaflet/dist/images/marker-icon.png";
import shadowUrl      from "leaflet/dist/images/marker-shadow.png";

// tell Leaflet where to find its marker assets
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

export interface ProviderMapProps {
  zipCodes:  number[];
  names:     string[];
  center?:   [number, number];
  zoom?:     number;
}

interface GeoLocation { lat: number; lng: number; name: string; }

// fits the map to show all markers
function FitMarkers({ locations }: { locations: GeoLocation[] }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length) {
      const bounds = locations.map(l => [l.lat, l.lng] as [number, number]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [locations, map]);
  return null;
}

export default function Map({
  zipCodes,
  names,
  center = [51.505, -0.09],
  zoom   = 13,
}: ProviderMapProps): JSX.Element {
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [loading,  setLoading]   = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      const results: GeoLocation[] = [];
      for (let i = 0; i < zipCodes.length; i++) {
        try {
          const res  = await fetch(`/api/geocode?zip=${zipCodes[i]}`);
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const { lat, lon } = data[0];
            results.push({
              lat:  parseFloat(lat),
              lng:  parseFloat(lon),
              name: names[i],
            });
          }
        } catch (err) {
          console.error(`Failed to geocode ZIP ${zipCodes[i]}`, err);
        }
      }
      setLocations(results);
      setLoading(false);
    }

    if (zipCodes.length) {
      setLoading(true);
      fetchLocations();
    } else {
      // no ZIPs → no map
      setLoading(false);
    }
  }, [zipCodes, names]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh] w-full">
        <span className="text-gray-600">Loading map…</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "50vh", width: "100%", borderRadius: "15px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* auto‐fit all markers */}
      <FitMarkers locations={locations} />

      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
