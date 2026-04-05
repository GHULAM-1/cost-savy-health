"use client";

import React, { useState, useEffect } from "react";
import { Youtube, Plus, Trash2, Loader2, ExternalLink } from "lucide-react";

interface Video {
  id: number;
  title: string;
  youtube_url: string;
  description: string | null;
  category: string;
  created_at: string;
}

const CATEGORIES = ["General", "Pricing Guide", "How It Works", "Insurance", "Medicare", "News"];

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  const [form, setForm] = useState({ title: "", youtube_url: "", description: "", category: "General" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/videos");
      if (!res.ok) throw new Error("Failed to load");
      setVideos(await res.json());
    } catch {
      setError("Could not load videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.youtube_url.trim()) { setSaveError("Title and URL are required"); return; }
    if (!youtubeId(form.youtube_url)) { setSaveError("Please enter a valid YouTube URL"); return; }
    setSaving(true); setSaveError("");
    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      setForm({ title: "", youtube_url: "", description: "", category: "General" });
      await load();
    } catch {
      setSaveError("Failed to save video. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this video?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      setVideos(v => v.filter(x => x.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">YouTube Videos</h1>
        <p className="text-gray-500 mt-1">Publish educational video content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        {/* Add form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Video
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
              <input
                value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6b2458]"
                placeholder="e.g. How to Compare Hospital Prices"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">YouTube URL *</label>
              <input
                value={form.youtube_url} onChange={e => setForm(f => ({ ...f, youtube_url: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6b2458]"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {form.youtube_url && !youtubeId(form.youtube_url) && (
                <p className="text-xs text-red-500 mt-1">Not a valid YouTube URL</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <select
                value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6b2458] bg-white"
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Description (optional)</label>
              <textarea
                value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#6b2458] resize-none"
                placeholder="Short description of the video"
              />
            </div>
            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
            <button
              type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-[#6b2458] hover:bg-[#8C2F5D] disabled:bg-gray-300 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Video"}
            </button>
          </form>
        </div>

        {/* Video list */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Youtube className="w-4 h-4 text-red-500" /> Published Videos ({videos.length})
          </h2>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : videos.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No videos yet. Add one on the left.</p>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {videos.map(v => {
                const vid = youtubeId(v.youtube_url);
                return (
                  <div key={v.id} className="flex gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200">
                    {vid && (
                      <img
                        src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                        alt="" className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800 truncate">{v.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{v.category}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <a href={v.youtube_url} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => handleDelete(v.id)}
                          disabled={deleting === v.id}
                          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 ml-auto"
                        >
                          {deleting === v.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
