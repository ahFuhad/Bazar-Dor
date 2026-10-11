"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="shrink-0 rounded-md border border-[#F05252] px-3 py-2 text-xs font-semibold text-[#D93636] hover:bg-red-50 disabled:opacity-60"
    >
      {loading ? "অপেক্ষা করুন..." : "↪ সাইন আউট"}
    </button>
  );
}
