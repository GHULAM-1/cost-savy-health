"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface UploadResult {
  upload_id: number;
  filename: string;
  hospital_name: string;
  rows_inserted: number;
}

export default function CptUpload() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<Array<{ file: string; ok: boolean; result?: UploadResult; error?: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const csvs = Array.from(incoming).filter(f => f.name.endsWith(".csv"));
    if (csvs.length === 0) { alert("Please select CSV files only."); return; }
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name));
      return [...prev, ...csvs.filter(f => !names.has(f.name))];
    });
  };

  const handleUploadAll = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setResults([]);
    const newResults: typeof results = [];

    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload-csv", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok) {
          newResults.push({ file: file.name, ok: true, result: data });
        } else {
          newResults.push({ file: file.name, ok: false, error: data.detail || "Upload failed" });
        }
      } catch {
        newResults.push({ file: file.name, ok: false, error: "Network error" });
      }
      setResults([...newResults]);
    }

    setUploading(false);
    setFiles([]);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">CPT Code Upload</h1>
        <p className="text-gray-500 mt-1">Upload CMS hospital standard charge CSV files — the AI will use them for price search</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            dragging ? "border-[#6b2458] bg-[#fdf2f8]" : "border-gray-300 hover:border-[#6b2458] hover:bg-gray-50"
          }`}
        >
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="font-semibold text-gray-700">Drop CSV files here or click to browse</p>
          <p className="text-sm text-gray-400 mt-1">Supports CMS hospital standard charge format · Multiple files allowed</p>
          <input
            ref={inputRef} type="file" accept=".csv" multiple className="hidden"
            onChange={e => addFiles(e.target.files)}
          />
        </div>

        {/* File queue */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-700 mb-3">Ready to upload ({files.length} file{files.length > 1 ? "s" : ""})</p>
            <ul className="space-y-2 mb-4">
              {files.map(f => (
                <li key={f.name} className="flex items-center gap-3 text-sm">
                  <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="flex-1 truncate text-gray-700">{f.name}</span>
                  <span className="text-gray-400 text-xs">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                  <button
                    onClick={e => { e.stopPropagation(); setFiles(prev => prev.filter(x => x.name !== f.name)); }}
                    className="text-gray-400 hover:text-red-500 text-xs"
                  >✕</button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleUploadAll} disabled={uploading}
              className="w-full flex items-center justify-center gap-2 bg-[#6b2458] hover:bg-[#8C2F5D] disabled:bg-gray-300 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</> : <><Upload className="w-4 h-4" /> Upload All</>}
            </button>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-gray-700">Upload Results</p>
            {results.map(r => (
              <div key={r.file} className={`flex items-start gap-3 p-3 rounded-lg ${r.ok ? "bg-green-50" : "bg-red-50"}`}>
                {r.ok
                  ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                <div>
                  <p className="text-sm font-medium text-gray-800">{r.file}</p>
                  {r.ok && r.result ? (
                    <p className="text-xs text-green-700 mt-0.5">
                      ✓ {r.result.rows_inserted.toLocaleString()} CPT rows loaded for <strong>{r.result.hospital_name}</strong>
                    </p>
                  ) : (
                    <p className="text-xs text-red-600 mt-0.5">{r.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Format guide */}
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expected CSV Format</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {[
              "CMS hospital standard charge files (900-series format)",
              "Must contain a column for CPT/procedure code",
              "Should include gross charge or cash/discounted price columns",
              "Payer name column is optional but recommended",
              "Files up to 50,000 rows per upload are supported",
            ].map(t => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-[#6b2458] mt-0.5">•</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
