import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import { getProducts } from "../../../lib/api";

type PageProps = {
    params: Promise<{ slug: string }>;
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat("bn-BD").format(price);

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;

    let products;

    try {
        products = await getProducts();
    } catch {
        return (
        <>
            <Header />
            <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
            <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
                <h1 className="text-2xl font-bold">দাম লোড করা যায়নি</h1>
                <p className="mt-3 text-gray-600">
                ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
                </p>
                <Link
                href="/"
                className="mt-5 inline-block rounded-xl bg-[#05893E] px-5 py-3 font-semibold text-white"
                >
                হোম পেজে ফিরে যান
                </Link>
            </div>
            </main>
        </>
        );
    }

    const product = products.find((item) => item.slug === slug);

    if (!product) notFound();

    const lowestMarket = product.markets.reduce((lowest, market) =>
        market.min < lowest.min ? market : lowest
    );

    const changeColor =
        product.change.dir === "up"
        ? "text-red-600 bg-red-50"
        : product.change.dir === "down"
            ? "text-green-700 bg-green-50"
            : "text-gray-600 bg-gray-100";

    const changeText =
        product.change.dir === "up"
        ? "▲ দাম বেড়েছে"
        : product.change.dir === "down"
            ? "▼ দাম কমেছে"
            : "— দাম অপরিবর্তিত";

    return (
        <>
        <Header />

        <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:py-10">
            <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#05893E] hover:underline"
            >
            ← সব পণ্যে ফিরে যান
            </Link>

            {/* Product overview */}
            <section className="mt-5 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex min-h-65 items-center justify-center rounded-3xl border border-[#E1E8E1] bg-white p-8 sm:min-h-85">
                <div className="text-center">
                <div className="text-8xl sm:text-9xl" aria-hidden="true">
                    {product.image}
                </div>
                <p className="mt-5 text-sm text-gray-500">
                    {product.categoryIcon} {product.categoryNameBn}
                </p>
                </div>
            </div>

            <div className="flex flex-col justify-center rounded-3xl border border-[#E1E8E1] bg-white p-6 sm:p-8">
                <p className="text-sm font-semibold text-[#05893E]">
                {product.categoryNameBn} বিভাগ
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#1D271F] sm:text-4xl">
                {product.nameBn}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "dozen" ? "ডজন" : product.unit}
                </p>

                <div className="mt-7 rounded-2xl bg-[#F0F5F0] p-5">
                <p className="text-sm text-gray-600">আজকের বাজারদর</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#05893E]">
                    ৳{formatPrice(product.today)}
                    </span>
                    <span className="text-sm text-gray-500">
                    / {product.unit === "kg" ? "কেজি" : product.unit === "dozen" ? "ডজন" : product.unit}
                    </span>
                </div>

                <span
                    className={`mt-4 inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${changeColor}`}
                >
                    {changeText} ({formatPrice(Math.abs(product.change.pct))}%)
                </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E1E8E1] p-4">
                    <p className="text-xs text-gray-500">সর্বনিম্ন বাজারদর</p>
                    <p className="mt-1 text-xl font-bold text-[#05893E]">
                    ৳{formatPrice(lowestMarket.min)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                    {lowestMarket.market}
                    </p>
                </div>

                <div className="rounded-xl border border-[#E1E8E1] p-4">
                    <p className="text-xs text-gray-500">গতকালের দাম</p>
                    <p className="mt-1 text-xl font-bold text-[#1D271F]">
                    ৳{formatPrice(product.yesterday)}
                    </p>
                </div>
                </div>
            </div>
            </section>

            {/* Price history */}
            <section className="mt-8 rounded-3xl border border-[#E1E8E1] bg-white p-5 sm:p-8">
            <div>
                <h2 className="text-2xl font-bold text-[#1D271F]">
                দামের ইতিহাস
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                বিভিন্ন সময়ের দামের তুলনা করুন।
                </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                { label: "আজ", price: product.today },
                { label: "গতকাল", price: product.yesterday },
                { label: "গত সপ্তাহ", price: product.lastWeek },
                { label: "গত মাস", price: product.lastMonth },
                ].map((item) => (
                <div
                    key={item.label}
                    className="rounded-2xl bg-[#F0F5F0] p-4"
                >
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-bold text-[#1D271F]">
                    ৳{formatPrice(item.price)}
                    </p>
                </div>
                ))}
            </div>
            </section>

            {/* Market comparison */}
            <section className="mt-8 rounded-3xl border border-[#E1E8E1] bg-white p-5 sm:p-8">
            <div>
                <h2 className="text-2xl font-bold text-[#1D271F]">
                বাজারভিত্তিক দাম
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                বিভিন্ন বাজারে এই পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম দেখুন।
                </p>
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-130 text-left text-sm">
                <thead>
                    <tr className="border-b border-[#E1E8E1] bg-[#F0F5F0]">
                    <th className="rounded-l-xl px-4 py-4 font-semibold">
                        বাজার
                    </th>
                    <th className="px-4 py-4 font-semibold">বিভাগ</th>
                    <th className="px-4 py-4 font-semibold">সর্বনিম্ন</th>
                    <th className="rounded-r-xl px-4 py-4 font-semibold">
                        সর্বোচ্চ
                    </th>
                    </tr>
                </thead>

                <tbody>
                    {product.markets.map((market, index) => (
                    <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className="border-b border-[#E1E8E1] last:border-0"
                    >
                        <td className="px-4 py-4 font-semibold text-[#1D271F]">
                        {market.market}
                        {market.market === lowestMarket.market &&
                            market.division === lowestMarket.division && (
                            <span className="ml-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                কম দাম
                            </span>
                            )}
                        </td>
                        <td className="px-4 py-4 text-gray-600">
                        {market.division}
                        </td>
                        <td className="px-4 py-4 font-semibold text-green-700">
                        ৳{formatPrice(market.min)}
                        </td>
                        <td className="px-4 py-4 font-semibold text-red-600">
                        ৳{formatPrice(market.max)}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            <p className="mt-4 text-xs text-gray-500">
                দ্রষ্টব্য: বাজারের দাম স্থান ও সময় অনুযায়ী পরিবর্তিত হতে পারে।
            </p>
            </section>

            <div className="py-8 text-center">
            <Link
                href="/"
                className="inline-flex rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white transition hover:bg-[#047C37]"
            >
                ← আরও পণ্যের দাম দেখুন
            </Link>
            </div>
        </main>
        </>
    );
}