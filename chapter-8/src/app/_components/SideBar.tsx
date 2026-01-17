"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname() || "";
  const links = [
    { href: "/admin/posts", label: "記事一覧" },
    { href: "/admin/categories", label: "カテゴリー一覧" },
  ];

  return (
    <aside className="left-0 top-20 h-[calc(100vh-5rem)] w-56 bg-gray-100 text-black border-r border-gray-200 z-0">
      <nav className="flex flex-col p-4 space-y-2">
        {links.map((l) => {
          const isActive = pathname.includes(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={
                "block px-4 py-2 rounded transition-colors duration-150 " +
                (isActive
                  ? "bg-blue-100"
                  : "hover:bg-blue-50 active:bg-blue-100")
              }
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
