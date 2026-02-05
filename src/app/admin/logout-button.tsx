"use client";

import { LogOut } from "lucide-react";
import { logout } from "./actions/auth";

export function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-400 bg-white text-zinc-700 shadow hover:bg-zinc-50 hover:border-zinc-500 transition-colors"
    >
      Logga ut
    </button>
  );
}
