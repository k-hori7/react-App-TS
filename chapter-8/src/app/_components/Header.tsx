"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../_libs/supabase";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";

export default function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    await router.replace(`/`);
  };
  const { session, isLoading } = useSupabaseSession();
  return (
    <header className="bg-[#333333] text-white flex items-center font-bold justify-between p-6">
      <Link href="/" className="text-white no-underline">
        Blog
      </Link>
      {!isLoading && (
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin/posts" className="header-link">
                管理画面
              </Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact" className="header-link">
                お問い合わせ
              </Link>
              <Link href="/sign_in" className="header-link pl-2">
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
