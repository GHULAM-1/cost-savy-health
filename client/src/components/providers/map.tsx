// components/Map.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


export interface ProviderMapProps {
  zipCodes: number[];
  names:     string[];
}

interface GeoLocation {
  lat: number;
  lng: number;
  name: string;
}

// Optional: if you see map sizing issues in prod, use this
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

export default function Map({ zipCodes, names }: ProviderMapProps) {
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      const results: GeoLocation[] = [];
      setError(null);

      for (let i = 0; i < zipCodes.length; i++) {
        try {
          const res = await fetch(`/api/geocode?zip=${zipCodes[i]}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch location for ZIP ${zipCodes[i]}`);
          }
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const { lat, lon } = data[0];
            results.push({
              lat: parseFloat(lat),
              lng: parseFloat(lon),
              name: names[i],
            });
          } else {
            console.warn(`No data for ZIP ${zipCodes[i]}`);
          }
        } catch (err) {
          console.error(`Failed to geocode ZIP ${zipCodes[i]}`, err);
          setError(`Unable to locate some providers. Please try again later.`);
        }
      }

      setLocations(results);
      setLoading(false);
    }

    if (zipCodes.length) {
      setLoading(true);
      fetchLocations();
    } else {
      setLocations([]);
      setLoading(false);
    }
  }, [zipCodes, names]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh] w-full">
        <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh] w-full">
        <span className="text-red-600">{error}</span>
      </div>
    );
  }

  if (!locations.length) {
    return null;
  }

  // Use the first location as the initial center
  const initialCenter: [number, number] = [locations[0].lat, locations[0].lng];

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      style={{ height: "50vh", width: "100%", borderRadius: "15px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitMarkers locations={locations} />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
