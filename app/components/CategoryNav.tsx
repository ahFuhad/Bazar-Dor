import Link from "next/link";

const categories = [
    { name: "চাল", icon: "🍚", slug: "chal" },
    { name: "ডাল", icon: "🫘", slug: "dal" },
    { name: "তেল", icon: "🛢️", slug: "tel" },
    { name: "সবজি", icon: "🥬", slug: "sobji" },
    { name: "মাছ", icon: "🐟", slug: "mach" },
    { name: "মাংস", icon: "🍗", slug: "mangsho" },
    { name: "ডিম-দুধ", icon: "🥛", slug: "dim-dui" },
    { name: "মসলা", icon: "🌶️", slug: "mosla" },
];

export default function CategoryNav() {
    return (
        <nav className="border-b border-[#E1E8E1] bg-[#FAFCFA]">
        <div className="mx-auto flex h-12.25 max-w-6xl items-center gap-2 overflow-x-auto px-4">
            {categories.map((category) => (
            <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1D271F]/70 transition hover:bg-[#F0F5F0] hover:text-[#05893E]"
            >
                {category.icon} {category.name}
            </Link>
            ))}
        </div>
        </nav>
    );
}