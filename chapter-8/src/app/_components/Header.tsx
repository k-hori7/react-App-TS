"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#333333] text-white flex items-center font-bold justify-between p-6">
      <Link href="/" className="text-white no-underline">
        Blog
      </Link>
      <Link href="/contact" className="text-white no-underline">
        お問い合わせ
      </Link>
    </header>
  );
}
