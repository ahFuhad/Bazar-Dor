"use client";

import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { toast } from "sonner";

export default function ProfileForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      setName(trimmedName);
      toast.success("প্রোফাইল আপডেট হয়েছে!");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label
        htmlFor="name"
        className="mb-2 block text-xs font-medium text-[#1D271F]"
      >
        নাম
      </label>

      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={100}
        className="h-9.5 w-full rounded-md border border-[#E1E8E1] bg-transparent px-3 text-sm text-[#1D271F] outline-none focus:border-[#05893E]"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-3 h-9.5 w-full rounded-md bg-[#05893E] text-sm font-semibold text-white shadow-sm transition hover:bg-[#047F39] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
      </button>
    </form>
  );
}
