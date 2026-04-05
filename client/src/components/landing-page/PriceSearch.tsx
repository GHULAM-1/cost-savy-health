"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Search, Loader2 } from "lucide-react";

const API_BASE = "https://costsavvy-backend.onrender.com";

// Leaflet map loaded client-side only
const FacilityMap = dynamic(() => import("./PriceSearchMap"), { ssr: false, loading: () => <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Loading map…</div> });

// ── Types ──────────────────────────────────────────────────────────────────
interface Facility {
  hospital_name: string;
  address: string | null;
  phone: string | null;
  distance_miles: number | null;
  price: number | null;
  web_price: number | null;
  estimated_range: string | null;
  price_is_estimate: boolean;
  price_source: string | null;
  latitude: number | null;
  longitude: number | null;
  facility_key: string;
  website_url: string | null;
  payer_name: string | null;
  payer_differs: boolean;
}

interface MapData {
  center: { latitude: number; longitude: number };
  user_location: { latitude: number; longitude: number; zipcode: string };
  facilities: Array<{
    list_index: number;
    facility_key: string;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    price: number | null;
    estimated_range: string | null;
    website_url: string | null;
  }>;
  google_maps_url?: string;
  procedure_code?: string;
  procedure_display_name?: string;
  service_query?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function normalizeAddress(s: string): string {
  return (s || "").replace(/\u00a0/g, " ").replace(/Â+/g, "").replace(/\s+/g, " ").trim();
}

const SERVICES = [
  { group: "Imaging", options: [{ value: "xray", label: "X-Ray" }, { value: "mri", label: "MRI" }, { value: "ct scan", label: "CT Scan" }, { value: "ultrasound", label: "Ultrasound" }, { value: "mammogram", label: "Mammogram" }] },
  { group: "Procedures", options: [{ value: "colonoscopy", label: "Colonoscopy" }, { value: "endoscopy", label: "Endoscopy" }] },
  { group: "Lab Tests", options: [{ value: "blood test", label: "Blood Test" }, { value: "urinalysis", label: "Urinalysis" }] },
  { group: "Visits", options: [{ value: "office visit", label: "Office Visit" }, { value: "emergency room", label: "Emergency Room" }] },
];

const INSURERS = ["UnitedHealthcare", "Blue Cross Blue Shield", "Aetna", "Cigna", "Humana", "Kaiser Permanente", "Anthem", "Centene / WellCare", "Molina Healthcare", "Oscar Health", "Medicare", "Medicaid", "Tricare"];

// ── Main Component ─────────────────────────────────────────────────────────
export default function PriceSearch() {
  const [service, setService] = useState("");
  const [cptCode, setCptCode] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [payment, setPayment] = useState("cash");
  const [insurer, setInsurer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [sortBy, setSortBy] = useState<"price" | "distance">("price");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [resultsTitle, setResultsTitle] = useState("");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [estimatesOnly, setEstimatesOnly] = useState(false);

  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string; time: string }>>([
    { role: "assistant", text: "Hi! I'm your healthcare price assistant. Use the Quick Search above, or ask me anything like:\n• \"How much does an MRI cost near 10001?\"\n• \"Find X-ray prices near 06119 with Aetna\"\n• \"Compare colonoscopy prices\"", time: "Just now" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sessionIdRef = useRef("session-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9));
  const resultsRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  // ── SSE fetch ──────────────────────────────────────────────────────────
  const fetchPrices = useCallback(async (message: string, freshContext = false) => {
    const body: Record<string, unknown> = { session_id: sessionIdRef.current, message };
    if (freshContext) body.fresh_context = true;

    const response = await fetch(`${API_BASE}/chat_stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`API error ${response.status}`);

    const text = await response.text();
    let fullText = "", mapDataResult: MapData | null = null, facilitiesResult: Facility[] = [], state: Record<string, unknown> = {};
    for (const line of text.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      try {
        const data = JSON.parse(line.slice(6));
        if (data.type === "session" && data.session_id) sessionIdRef.current = data.session_id;
        if (data.type === "delta" && data.text) fullText += data.text;
        if (data.type === "results") {
          mapDataResult = data.map_data || null;
          facilitiesResult = Array.isArray(data.facilities) ? data.facilities : [];
          state = data.state || {};
        }
      } catch {}
    }
    return { text: fullText, mapData: mapDataResult, facilities: facilitiesResult, state };
  }, []);

  // ── Quick search ───────────────────────────────────────────────────────
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service && !cptCode) { setError("Please select a service or enter a CPT code"); return; }
    if (!zipcode) { setError("Please enter your ZIP code"); return; }
    if (!/^\d{5}$/.test(zipcode)) { setError("ZIP code must be 5 digits"); return; }
    if (cptCode && !/^\d{5}$/.test(cptCode)) { setError("CPT code must be 5 digits"); return; }
    setError(""); setLoading(true);
    sessionIdRef.current = "session-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);

    const serviceQuery = service && cptCode ? `${service} (CPT code ${cptCode})` : cptCode ? `CPT code ${cptCode}` : service;
    const paymentInfo = payment === "insurance" && insurer ? `${insurer} insurance` : payment;
    const message = `How much does ${serviceQuery} cost? My ZIP is ${zipcode} and I'm paying with ${paymentInfo}.`;

    addChatMessage("user", message);
    setChatLoading(true);

    try {
      const { text, mapData: md, facilities: fs, state } = await fetchPrices(message, true);
      setChatLoading(false);
      if (text) addChatMessage("assistant", text);
      if (md && fs.length > 0) applyResults(md, fs, state, serviceQuery);
      else if (!text) setError(`No results found near ZIP ${zipcode}. Try a different service or location.`);
    } catch {
      setChatLoading(false);
      setError("Failed to fetch prices. Please try again.");
      addChatMessage("assistant", "Sorry, I encountered an error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Chat send ──────────────────────────────────────────────────────────
  const handleSend = async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;
    setChatInput(""); setChatLoading(true);
    addChatMessage("user", msg);
    try {
      const { text, mapData: md, facilities: fs, state } = await fetchPrices(msg);
      setChatLoading(false);
      if (text) addChatMessage("assistant", text);
      if (md && fs.length > 0) applyResults(md, fs, state, null);
    } catch {
      setChatLoading(false);
      addChatMessage("assistant", "Sorry, I encountered an error. Please try again.");
    }
  };

  function addChatMessage(role: "user" | "assistant", text: string) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages(prev => [...prev, { role, text, time }]);
  }

  function applyResults(md: MapData, fs: Facility[], state: Record<string, unknown>, serviceQuery: string | null) {
    setMapData(md);
    setFacilities(fs);
    setSelectedIdx(null);
    const cpt = String(state.code || md.procedure_code || "").trim();
    const proc = String(state.procedure_display_name || md.procedure_display_name || "").trim();
    let title = (serviceQuery || "").trim();
    if (proc && cpt) title = `${proc}, CPT code ${cpt}`;
    else if (!title && md.service_query) title = String(md.service_query).charAt(0).toUpperCase() + String(md.service_query).slice(1);
    setResultsTitle(title);
    const prices = fs.map(f => f.price).filter((p): p is number => p != null);
    if (prices.length > 0) { setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) }); setEstimatesOnly(false); }
    else { setPriceRange(null); setEstimatesOnly(true); }
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  // ── Sort facilities ────────────────────────────────────────────────────
  const sorted = [...facilities].sort((a, b) =>
    sortBy === "price"
      ? (a.price ?? Infinity) - (b.price ?? Infinity)
      : (a.distance_miles ?? Infinity) - (b.distance_miles ?? Infinity)
  );

  const minPrice = sorted.filter(f => f.price).map(f => f.price as number).reduce((m, p) => Math.min(m, p), Infinity);

  // ── Map markers synced to sorted list ─────────────────────────────────
  const mapFacilities = mapData ? { ...mapData, facilities: sorted.slice(0, 5).filter(f => f.latitude && f.longitude).map((f, i) => ({ list_index: i + 1, facility_key: f.facility_key, name: f.hospital_name, latitude: f.latitude!, longitude: f.longitude!, address: normalizeAddress(f.address || ""), price: f.price, estimated_range: f.estimated_range, website_url: f.website_url })) } : null;

  const QUICK_ACTIONS = ["How much does an MRI cost?", "Find X-ray prices near 10001", "How much does a CT scan cost?", "Colonoscopy prices near me"];

  return (
    <div className="w-full">
      {/* ── Quick Search Form ── */}
      <form onSubmit={handleSearch} className="w-full py-6">
        <div className="flex flex-col lg:flex-row w-full border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {/* Service */}
          <div className="flex-1 min-w-0 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="px-4 py-3">
              <label className="block text-xs text-gray-500 font-medium mb-1">Service</label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#6b2458] flex-shrink-0" />
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="flex-1 text-sm text-gray-700 bg-transparent outline-none cursor-pointer"
                >
                  <option value="">Select a service…</option>
                  {SERVICES.map(g => (
                    <optgroup key={g.group} label={g.group}>
                      {g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="flex items-center my-1 text-xs text-gray-400 gap-2"><hr className="flex-1 border-gray-200" /><span>or CPT code</span><hr className="flex-1 border-gray-200" /></div>
              <input
                type="text" value={cptCode} onChange={e => setCptCode(e.target.value)}
                placeholder="e.g. 71046" maxLength={5} inputMode="numeric"
                className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#6b2458]"
              />
            </div>
          </div>

          {/* ZIP */}
          <div className="flex-1 min-w-0 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="px-4 py-3">
              <label className="block text-xs text-gray-500 font-medium mb-1">ZIP Code</label>
              <input
                type="text" value={zipcode} onChange={e => setZipcode(e.target.value)}
                placeholder="e.g. 10001" maxLength={5} inputMode="numeric" required
                className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#6b2458]"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="flex-1 min-w-0 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="px-4 py-3">
              <label className="block text-xs text-gray-500 font-medium mb-1">Payment Type</label>
              <select value={payment} onChange={e => setPayment(e.target.value)} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#6b2458] bg-white">
                <option value="cash">Cash / Self-Pay</option>
                <option value="insurance">Insurance</option>
              </select>
              {payment === "insurance" && (
                <select value={insurer} onChange={e => setInsurer(e.target.value)} className="w-full mt-2 text-sm px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#6b2458] bg-white">
                  <option value="">All providers</option>
                  {INSURERS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="px-4 py-3 flex items-end">
            <button
              type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#8C2F5D] hover:bg-[#A34E78] disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors w-full lg:w-auto cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search Prices
            </button>
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
      </form>

      {/* ── Results ── */}
      {facilities.length > 0 && (
        <div ref={resultsRef} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-800">Results for {resultsTitle}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {priceRange ? (
                <span>Price range: <span className="font-semibold text-green-600">${priceRange.min.toLocaleString()}</span> – <span className="font-semibold text-red-500">${priceRange.max.toLocaleString()}</span></span>
              ) : (
                <span className="italic">estimates only — contact facilities for exact pricing</span>
              )}
              <span>{facilities.length} {facilities.length === 1 ? "facility" : "facilities"}</span>
            </div>
          </div>

          {/* List + Map grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Facility list */}
            <div className="border-r border-gray-100">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-600">Nearby Facilities</h3>
                <select value={sortBy} onChange={e => setSortBy(e.target.value as "price" | "distance")} className="text-xs px-2 py-1 border border-gray-200 rounded-md bg-white">
                  <option value="price">Lowest price</option>
                  <option value="distance">Nearest</option>
                </select>
              </div>
              <div className="max-h-[440px] overflow-y-auto divide-y divide-gray-50">
                {sorted.map((f, i) => {
                  const priceText = f.price ? `$${f.price.toLocaleString()}` : (f.estimated_range || "Contact");
                  const isLow = f.price && f.price <= minPrice * 1.2;
                  const isEst = !f.price;
                  const showWeb = f.web_price != null && Number(f.web_price) > 0;
                  const note = f.price
                    ? (f.price_source === "web_search" ? "Web search" : "Verified")
                    : "Estimate";
                  let siteHtml: React.ReactNode = null;
                  try {
                    if (f.website_url) {
                      const u = new URL(f.website_url.trim());
                      if (u.protocol === "http:" || u.protocol === "https:") {
                        const label = f.website_url.includes("google.com/maps") ? "View on Google Maps ↗" : "Visit website ↗";
                        siteHtml = <a href={u.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs font-medium mt-1 block">{label}</a>;
                      }
                    }
                  } catch {}

                  return (
                    <div
                      key={f.facility_key || i}
                      onClick={() => setSelectedIdx(i)}
                      className={`flex justify-between items-start p-4 cursor-pointer transition-colors ${selectedIdx === i ? "bg-[#fdf2f8] border-l-2 border-[#6b2458]" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex gap-3 flex-1 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-[#6b2458] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#6b2458] text-sm truncate">{f.hospital_name || "Healthcare Facility"}</p>
                          <p className="text-xs text-gray-400 mb-1">Healthcare Facility</p>
                          {f.payer_differs && f.payer_name && (
                            <p className="text-xs text-amber-600 font-semibold mb-1">Insurance covered by {f.payer_name}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            {f.distance_miles != null && <span>📍 {f.distance_miles.toFixed(1)} mi · </span>}
                            {normalizeAddress(f.address || "")}
                          </p>
                          {siteHtml}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <p className={`text-lg font-bold ${isLow ? "text-green-600" : isEst ? "text-gray-400 text-sm" : "text-gray-800"}`}>{priceText}</p>
                        <p className="text-xs text-gray-400">{note}</p>
                        {showWeb && f.price_source !== "web_search" && <p className="text-xs text-blue-600 font-semibold mt-1">Web: ${Number(f.web_price).toLocaleString()}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="min-h-[440px]">
              {mapFacilities && (
                <FacilityMap
                  mapData={mapFacilities}
                  selectedIdx={selectedIdx}
                  onSelectFacility={setSelectedIdx}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── AI Chat ── */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#6b2458] px-5 py-4 flex justify-between items-center">
          <h2 className="text-white font-semibold flex items-center gap-2 text-base">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            AI Healthcare Price Assistant
          </h2>
          <span className="flex items-center gap-1.5 text-xs text-white/80"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" />Online</span>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {chatMessages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${m.role === "assistant" ? "bg-[#6b2458] text-white" : "bg-gray-200 text-gray-600"}`}>
                {m.role === "assistant" ? "💬" : "👤"}
              </div>
              <div className="max-w-[75%]">
                <div className={`px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === "assistant" ? "bg-white border border-gray-100 text-gray-800 rounded-tl-none" : "bg-[#6b2458] text-white rounded-tr-none"}`}>
                  {m.text}
                </div>
                <p className={`text-[11px] text-gray-400 mt-1 ${m.role === "user" ? "text-right" : ""}`}>{m.time}</p>
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6b2458] text-white flex items-center justify-center text-sm flex-shrink-0">💬</div>
              <div className="bg-white border border-gray-100 rounded-xl rounded-tl-none px-3 py-2">
                <div className="flex gap-1">{[0, 0.2, 0.4].map((d, i) => <span key={i} className="w-2 h-2 rounded-full bg-[#6b2458] animate-bounce" style={{ animationDelay: `${d}s` }} />)}</div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2">
            <input
              type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !chatLoading && handleSend()}
              placeholder="Ask about healthcare prices…"
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full text-sm outline-none focus:border-[#6b2458] focus:ring-2 focus:ring-[#6b2458]/10"
            />
            <button onClick={handleSend} disabled={chatLoading} className="w-10 h-10 rounded-full bg-[#6b2458] hover:bg-[#8C2F5D] disabled:bg-gray-300 text-white flex items-center justify-center transition-colors cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {QUICK_ACTIONS.map(q => (
              <button key={q} onClick={() => { setChatInput(q); }} className="px-3 py-1.5 bg-[#fdf2f8] text-[#6b2458] border border-[#f5d0e6] rounded-full text-xs hover:bg-[#6b2458] hover:text-white transition-colors cursor-pointer">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
