"use client";
// Linkのimportが違うNext用のリンクがある
// import { Link } from "react-router-dom";
import Link from "next/link";
// 使い方はほぼ同じ（to ではなく href）

export default function Header() {
  return (
    <header className="bg-[#333333] text-white flex items-center font-bold justify-between p-6">
      {/* <Link to={`/`}>Blog</Link> */}
      {/* <Link to={`/contact`}>お問い合わせ</Link> */}
      <Link href="/" className="text-white no-underline">
        Blog
      </Link>
      <Link href="/contact" className="text-white no-underline">
        お問い合わせ
      </Link>
    </header>
  );
}
