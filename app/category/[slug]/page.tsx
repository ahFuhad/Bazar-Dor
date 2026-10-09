import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import CategoryProductList from "../../components/CategoryProductList";
import { getProducts } from "../../../lib/api";

type PageProps = {
    params: Promise<{ slug: string }>;
};

const categoryNames: Record<string, string> = {
    chal: "চাল",
    dal: "ডাল",
    tel: "তেল",
    sobji: "সবজি",
    mach: "মাছ",
    mangsho: "মাংস",
    "dim-dui": "ডিম-দুধ",
    mosla: "মসলা",
};

function formatNumber(number: number) {
    return new Intl.NumberFormat("bn-BD").format(number);
}

export default async function CategoryPage({
    params,
    }: PageProps) {
    const { slug } = await params;
    const categoryName = categoryNames[slug];

    if (!categoryName) {
        notFound();
    }

    const products = await getProducts();

    const categoryProducts = products.filter(
        (product) => product.category === slug
    );

    if (categoryProducts.length === 0) {
        notFound();
    }

    return (
        <>
        <Header />

        <main className="mx-auto min-h-screen max-w-6xl px-4 py-6">
            <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#05893E] hover:underline"
            >
            ← সব পণ্যে ফিরে যান
            </Link>

            <section className="mb-8 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5 sm:p-8">
            <p className="text-sm font-semibold text-[#05893E]">
                পণ্যের বিভাগ
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#1D271F] sm:text-4xl">
                {categoryName}
            </h1>

            <p className="mt-3 text-sm text-[#1D271F]/65">
                {categoryName} বিভাগের সব পণ্যের বর্তমান বাজারদর দেখুন।
            </p>

            <div className="mt-5 inline-flex rounded-xl bg-[#F0F5F0] px-4 py-2 text-sm font-semibold">
                মোট পণ্য: {formatNumber(categoryProducts.length)}টি
            </div>
            </section>

            <section>
            <div className="mb-5">
                <h2 className="text-xl font-bold text-[#1D271F]">
                {categoryName} পণ্যসমূহ
                </h2>

                <p className="mt-1 text-sm text-[#1D271F]/60">
                আজকের দাম ও দামের পরিবর্তন
                </p>
            </div>

            <CategoryProductList products={categoryProducts} />
            </section>
        </main>
        </>
    );
}