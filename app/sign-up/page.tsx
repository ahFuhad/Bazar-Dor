"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../../lib/auth-client";
import Header from "../components/Header";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! সাইন ইন করুন।");
      router.push("/sign-in");
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
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          {/* Card Box */}
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm"
                >
                  নাম
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#05893E]"
                  placeholder="যেমন: রহিম উদ্দিন"
                />
              </div>

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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full rounded-xl border p-3 pr-24"
                    placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                  >
                    {showPassword ? "লুকান" : "দেখান"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#05893E]"
                    placeholder="আবার লিখুন"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
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
                {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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

            {/* Already have account */}
            <p className="mt-5 text-center text-xs text-gray-500">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-[#05893E] hover:underline"
              >
                সাইন ইন করুন
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
