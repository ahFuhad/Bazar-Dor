"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";
import Header from "../components/Header";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`${provider} দিয়ে সাইন ইন করতে ব্যর্থ হয়েছে`);
      setSocialLoading(null);
    }
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
        <section className="w-full max-w-120">
          {/* Title & Subtitle */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1D271F] sm:text-3xl">
              সাইন ইন
            </h1>
            <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট ঢুকুন।
            </p>
          </div>

          {/* Card Box */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm"
                >
                  ইমেইল
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#05893E]"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm"
                >
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 pr-16 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#05893E]"
                    placeholder="কমপক্ষে ৮ অক্ষর"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "লুকান" : "দেখান"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-[#05893E] py-3 text-sm font-semibold text-white transition hover:bg-[#047C37] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-gray-400">
                অথবা
              </span>
            </div>

            {/* Social Sign-In Buttons */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleSocialSignIn("google")}
                disabled={socialLoading !== null}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <Image
                  src="/google.png"
                  alt="Google"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                <span>Google দিয়ে চালিয়ে যান</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn("github")}
                disabled={socialLoading !== null}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <Image
                  src="/github.png"
                  alt="GitHub"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                <span>GitHub দিয়ে চালিয়ে যান</span>
              </button>
            </div>

            {/* Register Link */}
            <p className="mt-5 text-center text-xs text-gray-500">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-[#05893E] hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
