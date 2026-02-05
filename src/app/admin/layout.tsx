import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - KeraLux",
  description: "KeraLux Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <main>{children}</main>
    </div>
  );
}
