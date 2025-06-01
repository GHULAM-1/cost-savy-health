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
}: ProviderMapProps) {
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
          console.log(`Raw geocode response for ZIP ${zipCodes[i]}:`, data);
          
          if (Array.isArray(data) && data.length > 0) {
            const { lat, lon } = data[0];
            console.log(`Extracted Lat: ${lat}, Lng: ${lon} for ZIP ${zipCodes[i]}`);
            results.push({
              lat: parseFloat(lat),
              lng: parseFloat(lon),
              name: names[i],
            });
          } else {
            console.warn(`No location data found for ZIP ${zipCodes[i]}`);
          }
        } catch (err) {
          console.error(`Failed to geocode ZIP ${zipCodes[i]}`, err);
          setError(`Unable to locate some providers. Please try a different ZIP code.`);
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
    console.log("zip codes and name",zipCodes, names)
  }, [zipCodes, names]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh] w-full">
        <span className="text-gray-600">Loading map…</span>
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
    return (
      <div className="flex items-center justify-center h-[50vh] w-full">
        <span className="text-gray-600">No locations to display</span>
      </div>
    );
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
