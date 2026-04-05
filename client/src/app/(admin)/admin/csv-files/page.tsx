"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Database, Trash2, Loader2, RefreshCw, CheckCircle,
  XCircle, Clock, Search, ChevronDown, ChevronUp,
} from "lucide-react";

interface CsvFile {
  id: number;
  filename: string;
  hospital_name: string | null;
  row_count: number;
  uploaded_at: string;
  status: "done" | "processing" | "error";
  error_message: string | null;
}

interface ListResponse {
  total: number;
  items: CsvFile[];
}

interface CptRow {
  hospital_name: string;
  code: string;
  code_type: string | null;
  service_description: string | null;
  payer_name: string | null;
  plan_name: string | null;
  cash_price: number | null;
  gross_price: number | null;
  negotiated_price: number | null;
  estimated_amount: number | null;
}

interface CptSearchResult {
  code: string;
  total: number;
  items: CptRow[];
}

const STATUS_ICON = {
  done: <CheckCircle className="w-4 h-4 text-green-500" />,
  processing: <Clock className="w-4 h-4 text-yellow-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
};

function fmt(n: number | null): string {
  if (n == null) return "—";
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function CptSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CptSearchResult | null>(null);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback(async (code: string) => {
    const c = code.trim();
    if (!c) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/admin/cpt-search?code=${encodeURIComponent(c)}&limit=100`);
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || d.error || "Search failed");
      }
      setResult(await res.json());
      setExpanded(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div className="mb-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#6b2458]" />
          <h2 className="font-semibold text-gray-800 text-sm">Search CPT Code Across All Hospitals</h2>
        </div>
        {result && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-gray-400 hover:text-gray-600"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="px-5 py-4 flex gap-3 items-center border-b border-gray-100">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter CPT or HCPCS code, e.g. 96401"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b2458]/30 focus:border-[#6b2458]"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="flex items-center gap-2 bg-[#6b2458] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#5a1d49] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Search
        </button>
      </form>

      {/* Error */}
      {error && <p className="px-5 py-3 text-sm text-red-500">{error}</p>}

      {/* Results */}
      {result && expanded && (
        <>
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{result.total}</span> hospital
              {result.total !== 1 ? "s" : ""} have pricing data for CPT{" "}
              <span className="font-mono font-semibold text-[#6b2458]">{result.code}</span>
              {result.total > result.items.length && (
                <span className="text-gray-400"> (showing first {result.items.length})</span>
              )}
            </p>
            {result.total === 0 && (
              <p className="text-sm text-gray-400">No uploaded CSV files contain this code.</p>
            )}
          </div>

          {result.items.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hospital</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payer / Plan</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cash</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Negotiated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.items.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800 max-w-[200px]">
                        <p className="truncate" title={row.hospital_name}>{row.hospital_name}</p>
                      </td>
                      <td className="px-5 py-3 text-gray-500 max-w-[220px]">
                        <p className="truncate" title={row.service_description ?? ""}>{row.service_description || "—"}</p>
                      </td>
                      <td className="px-5 py-3 text-gray-500 max-w-[160px]">
                        {row.payer_name ? (
                          <>
                            <p className="truncate text-xs font-medium text-gray-700" title={row.payer_name}>{row.payer_name}</p>
                            {row.plan_name && <p className="truncate text-xs text-gray-400" title={row.plan_name}>{row.plan_name}</p>}
                          </>
                        ) : "—"}
                      </td>
                      <td className={`px-5 py-3 text-right font-mono whitespace-nowrap ${row.cash_price != null ? "text-green-700 font-semibold" : "text-gray-400"}`}>
                        {fmt(row.cash_price)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono whitespace-nowrap text-gray-700">
                        {fmt(row.gross_price)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono whitespace-nowrap text-gray-700">
                        {fmt(row.negotiated_price ?? row.estimated_amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function CsvRepository() {
  const [data, setData] = useState<ListResponse>({ total: 0, items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/csv-files?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`);
      if (!res.ok) throw new Error("Failed to load");
      setData(await res.json());
    } catch {
      setError("Could not load CSV files.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number, filename: string) => {
    if (!confirm(`Delete "${filename}" and all its CPT rows from the database?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/csv-files/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch {
      alert("Delete failed. Try again.");
    } finally {
      setDeleting(null);
    }
  };

  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CSV Repository</h1>
          <p className="text-gray-500 mt-1">{data.total} file{data.total !== 1 ? "s" : ""} in database</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* CPT cross-hospital search */}
      <CptSearch />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-5xl">
        {loading && data.items.length === 0 ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
        ) : data.items.length === 0 ? (
          <div className="text-center py-16">
            <Database className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No CSV files uploaded yet.</p>
            <a href="/admin/cpt-upload" className="text-[#6b2458] text-sm underline mt-2 block">Upload your first file →</a>
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">File</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hospital</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rows</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Uploaded</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.items.map(f => (
                  <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-800 truncate max-w-xs" title={f.filename}>{f.filename}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{f.hospital_name || "—"}</td>
                    <td className="px-5 py-3 text-right font-mono text-gray-700">
                      {f.row_count > 0 ? f.row_count.toLocaleString() : "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(f.uploaded_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        f.status === "done" ? "bg-green-50 text-green-700" :
                        f.status === "error" ? "bg-red-50 text-red-700" :
                        "bg-yellow-50 text-yellow-700"
                      }`}>
                        {STATUS_ICON[f.status]} {f.status}
                      </span>
                      {f.status === "error" && f.error_message && (
                        <p className="text-xs text-red-500 mt-0.5 max-w-xs truncate" title={f.error_message}>{f.error_message}</p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => handleDelete(f.id, f.filename)}
                        disabled={deleting === f.id}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        {deleting === f.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">Page {page + 1} of {totalPages}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => p - 1)} disabled={page === 0}
                    className="px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Previous</button>
                  <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}
                    className="px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
