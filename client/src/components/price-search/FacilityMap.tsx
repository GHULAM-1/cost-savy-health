"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export interface MapFacility {
  name: string;
  latitude: number;
  longitude: number;
  price?: number | null;
  estimated_range?: string | null;
  address?: string | null;
  website_url?: string | null;
}

interface FacilityMapProps {
  userLat: number;
  userLon: number;
  facilities: MapFacility[];
}

function FitBounds({ userLat, userLon, facilities }: FacilityMapProps) {
  const map = useMap();
  useEffect(() => {
    const points: [number, number][] = [[userLat, userLon]];
    facilities.forEach((f) => points.push([f.latitude, f.longitude]));
    if (points.length > 1) {
      map.fitBounds(points, { padding: [40, 40] });
    } else {
      map.setView([userLat, userLon], 12);
    }
  }, [userLat, userLon, facilities, map]);
  return null;
}

export default function FacilityMap({ userLat, userLon, facilities }: FacilityMapProps) {
  return (
    <MapContainer
      center={[userLat, userLon]}
      zoom={12}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds userLat={userLat} userLon={userLon} facilities={facilities} />

      {/* User location marker */}
      <Circle
        center={[userLat, userLon]}
        radius={300}
        pathOptions={{ color: "#2563eb", fillColor: "#2563eb", fillOpacity: 0.7 }}
      />

      {/* Facility markers */}
      {facilities.map((f, i) => (
        <Marker key={i} position={[f.latitude, f.longitude]}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong style={{ fontSize: 14 }}>{f.name}</strong>
              {f.address && <p style={{ margin: "4px 0", fontSize: 12, color: "#555" }}>{f.address}</p>}
              <p style={{ margin: "4px 0", fontWeight: 600, color: "#6B1548" }}>
                {f.price != null
                  ? `$${f.price.toLocaleString()}`
                  : f.estimated_range
                  ? `${f.estimated_range} (est.)`
                  : "Contact facility"}
              </p>
              {f.website_url && (
                <a
                  href={f.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, color: "#2563eb" }}
                >
                  Visit website ↗
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
