"use client";
import React from "react";
import SideBar from "../_components/SideBar";
import { useRouteGuard } from "../_hooks/useRouteGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRouteGuard();
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}
