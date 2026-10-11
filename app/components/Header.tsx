"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import Image from "next/image";
import LiveDate from "./LiveDate";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি");
      return;
    }

    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  }
  return (
    <header className="border-b border-[#E1E8E1] bg-[#FAFCFA]/95">
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-[#05893E]">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className="object-contain"
            />
          </div>

          <div>
            <div className="text-xl font-bold tracking-[-0.5px]">বাজার দর</div>
            <LiveDate />
          </div>
        </Link>

        {!isPending &&
          (session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="text-sm font-medium">
                {session.user.name || "আমার প্রোফাইল"}
              </Link>

              <button
                onClick={handleSignOut}
                className="rounded-xl border text-[#D93636] px-4 py-2 text-sm font-medium"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="rounded-lg px-4.25 py-1 text-sm font-semibold text-[#05893E] hover:bg-[#F0F5F0]"
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-[#05893E] px-4.25 py-2 text-sm font-semibold text-[#F3FBF4] shadow-sm hover:bg-[#047F39]"
              >
                সাইন আপ
              </Link>
            </div>
          ))}
      </div>

      <CategoryNav />

      <PriceTicker />
    </header>
  );
}
