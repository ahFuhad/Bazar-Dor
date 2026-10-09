import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import PriceBadge from "../../components/PriceBadge";
import { getProducts } from "../../../lib/api";

function formatNumber(number: number) {
    return new Intl.NumberFormat("bn-BD").format(number);
}

function getUnitText(unit: string) {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "dozen") return "ডজন";
    if (unit === "piece") return "পিস";
    return unit;
}

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
    params,
}: PageProps) {
    const { slug } = await params;
    const products = await getProducts();
    const product = products.find((item) => item.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <>
        <Header />

        <main className="mx-auto max-w-6xl px-4 py-6">
            <Link
            href="/"
            className="mb-5 inline-flex text-sm font-semibold text-[#05893E] hover:underline"
            >
            ← সব পণ্যে ফিরে যান
            </Link>

            <section className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-7xl">
                {product.image}
                </div>

                <div className="flex-1">
                <p className="text-sm font-semibold text-[#05893E]">
                    {product.categoryIcon} {product.categoryNameBn}
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                    {product.nameBn}
                </h1>

                <p className="mt-2 text-sm text-[#1D271F]/60">
                    প্রতি {getUnitText(product.unit)}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                    <p className="text-3xl font-bold">
                    {formatNumber(product.today)} টাকা
                    </p>
                    <PriceBadge
                    direction={product.change.dir}
                    percentage={product.change.pct}
                    />
                </div>

                <p className="mt-2 text-sm text-[#1D271F]/60">
                    গতকাল: {formatNumber(product.yesterday)} টাকা
                </p>
                </div>
            </div>
            </section>

            <section className="mt-6">
            <h2 className="mb-4 text-xl font-bold">
                বাজারভিত্তিক দাম
            </h2>

            <div className="overflow-hidden rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA]">
                <div className="grid grid-cols-3 gap-3 border-b border-[#E1E8E1] bg-[#F0F5F0] px-4 py-3 text-sm font-semibold">
                <span>বাজার</span>
                <span>সর্বনিম্ন</span>
                <span>সর্বোচ্চ</span>
                </div>

                {product.markets.map((market, index) => (
                <div
                    key={`${market.market}-${index}`}
                    className="grid grid-cols-3 gap-3 border-b border-[#E1E8E1] px-4 py-4 text-sm last:border-b-0"
                >
                    <div>
                    <p className="font-semibold">{market.market}</p>
                    <p className="mt-1 text-xs text-[#1D271F]/60">
                        {market.division}
                    </p>
                    </div>

                    <p className="font-semibold text-[#1A9951]">
                    {formatNumber(market.min)} টাকা
                    </p>

                    <p className="font-semibold text-[#D03739]">
                    {formatNumber(market.max)} টাকা
                    </p>
                </div>
                ))}
            </div>
            </section>
        </main>
        </>
    );
}