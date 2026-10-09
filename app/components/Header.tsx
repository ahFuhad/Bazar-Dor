import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import Image from "next/image";

export default function Header() {
    return (
        <header className="border-b border-[#E1E8E1] bg-[#FAFCFA]/95">
        <div className="mx-auto flex h-17 max-w-6xl items-center justify-between gap-3 px-4">
            
            <Link href="/" className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-[#05893E]">
                    <Image
                        src="/logo-icon.png"
                        alt="বাজার দর"
                        fill
                        className="object-contain"
                    />
                </div>

                <div>
                    <div className="text-xl font-bold tracking-[-0.5px]">
                    বাজার দর
                    </div>

                    <div className="text-xs text-[#1D271F]/60">
                    বৃহস্পতিবার, ৮ অক্টোবর ২০২৬
                    </div>
                </div>
            </Link>

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
        </div>

        <CategoryNav />

        <PriceTicker />
        </header>
    );
}