import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="overflow-hidden rounded-3xl border border-[#E1E8E1] bg-[#FAFCFA]">
        <div className="flex min-h-70.75 items-center gap-6 px-6 py-10 md:px-10">
            {/* Left side */}
            <div className="max-w-xl flex-1">
            <div className="mb-4 inline-flex rounded-[14px] bg-[#F0F5F0] px-3 py-1.5 text-sm font-medium text-[#1D271F]/70">
                বৃহস্পতিবার, ৮ অক্টোবর ২০২৬
            </div>

            <h1 className="text-3xl font-bold leading-11.25 tracking-[-0.5px] md:text-4xl">
                আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 max-w-140 text-base leading-6 text-[#1D271F]/70">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
                পরিবর্তন এক জায়গায়।
            </p>

            <Link
                href="#সব-পণ্য"
                className="mt-6 inline-flex h-10 items-center rounded-lg bg-[#05893E] px-4.25 text-sm font-semibold text-[#F3FBF4] shadow-sm transition hover:bg-[#047F39]"
            >
                সব পণ্য দেখুন
            </Link>
            </div>

            {/* Right side */}
            <div className="hidden h-65.75 w-78.75 shrink-0 items-center justify-center md:flex">
                <Image
                    src="/bazar-hero.png"
                    alt="বাজার দর"
                    width={315}
                    height={263}
                    priority
                    className="object-contain"
                />
            </div>
        </div>
        </section>
    );
}