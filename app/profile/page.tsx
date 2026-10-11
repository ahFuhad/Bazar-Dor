import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import Header from "../components/Header";
import ProfileForm from "./ProfileForm";
import SignOutButton from "./SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;
  const avatar = "image" in user ? user.image : null;

  return (
    <>
      <Header />
      <main className="min-h-170 flex-1 bg-[#F0F5F0] px-4 pb-20 pt-20">
        <div className="mx-auto w-full max-w-130">
          <header className="mb-5">
            <h1 className="text-xl font-bold text-[#1D271F]">আমার প্রোফাইল</h1>
            <p className="mt-1 text-xs text-[#647067]">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </header>

          <section className="flex min-h-19.75 items-center gap-3 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
            {avatar ? (
              <Image
                src={avatar}
                alt="প্রোফাইল ছবি"
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E2EFE4] text-lg font-bold text-[#05893E]">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1D271F]">
                {user.name || "ব্যবহারকারী"}
              </p>
              <p className="mt-1 truncate text-xs text-[#647067]">
                {user.email}
              </p>
            </div>

            <SignOutButton />
          </section>

          <section className="mt-4 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4 sm:p-6">
            <h2 className="text-sm font-bold text-[#1D271F]">তথ্য</h2>

            <ProfileForm initialName={user.name || ""} />
          </section>
        </div>
      </main>
    </>
  );
}
