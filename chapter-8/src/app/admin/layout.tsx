import React from "react";
import SideBar from "../_components/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}
