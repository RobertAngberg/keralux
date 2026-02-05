"use client";

import { useState } from "react";
import { login } from "./actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-8">
          <h1 className="text-xl font-semibold text-center mb-6 text-zinc-900">Logga in</h1>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-600 mb-1.5">
                Användarnamn
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                className="w-full border border-zinc-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-600 mb-1.5">
                Lösenord
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="w-full border border-zinc-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-2.5 rounded-md font-medium hover:bg-zinc-800 transition-colors disabled:bg-zinc-400"
            >
              {loading ? "Loggar in..." : "Logga in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
