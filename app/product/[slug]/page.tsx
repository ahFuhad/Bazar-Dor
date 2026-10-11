import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "../../../lib/auth";
import Link from "next/link";
import Header from "../../components/Header";
import { getProducts } from "../../../lib/api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);

const formatUnit = (unit: string) =>
  unit === "kg" ? "কেজি" : unit === "dozen" ? "ডজন" : unit;

export default async function ProductDetailPage({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { slug } = await params;

  let products;

  try {
    products = await getProducts();
  } catch {
    return (
      <>
        <Header />
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-12">
          <div className="rounded-xl border border-[#E1E8E1] bg-white p-8 text-center">
            <h1 className="text-xl font-bold">দাম লোড করা যায়নি</h1>
            <p className="mt-2 text-sm text-gray-500">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-semibold text-[#05893E]"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
      </>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowest = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const highest = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const average =
    markets.length > 0
      ? markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : 0;

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <>
      <Header />

      <main className="mx-auto min-h-screen max-w-6xl px-4 pb-10 pt-5 sm:pt-7">
        {/* Breadcrumb */}
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#05893E]">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[#05893E]"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-[#1D271F]">{product.nameBn}</span>
        </nav>

        {/* Product overview */}
        <section className="flex flex-col justify-between gap-5 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4 sm:flex-row sm:items-center sm:px-6 sm:py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#1D271F] sm:text-2xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-xs text-gray-500">
                {product.categoryNameBn} · প্রতি {formatUnit(product.unit)}
              </p>
              <p className="mt-2 text-xs text-gray-600">
                বাংলাদেশের বিভিন্ন বাজারের আজকের দর দেখুন।
              </p>
            </div>
          </div>

          <div className="min-w-30 rounded-xl bg-[#F0F5F0] px-5 py-3 text-center sm:shrink-0">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-2xl font-bold text-[#1D271F]">
              ৳{formatPrice(product.today)}
            </p>
            <p className="text-xs text-gray-500">
              প্রতি {formatUnit(product.unit)}
            </p>
            <p className={`mt-1 text-xs font-semibold ${changeColor}`}>
              {changeIcon} {formatPrice(Math.abs(product.change.pct))}%
            </p>
          </div>
        </section>

        {/* Three price summary cards */}
        <section className="mt-4 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4 sm:p-5">
          <h2 className="text-sm font-bold text-[#1D271F]">দামের সারসংক্ষেপ</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E1E8E1] p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-xl font-bold text-[#05893E]">
                ৳{formatPrice(lowest)}
              </p>
              <p className="mt-1 text-xs text-gray-500">সব বাজারের মধ্যে</p>
            </div>

            <div className="rounded-xl border border-[#E1E8E1] p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-xl font-bold text-red-600">
                ৳{formatPrice(highest)}
              </p>
              <p className="mt-1 text-xs text-gray-500">সব বাজারের মধ্যে</p>
            </div>

            <div className="rounded-xl border border-[#E1E8E1] p-4">
              <p className="text-xs text-gray-500">গড় বাজারদর</p>
              <p className="mt-2 text-xl font-bold text-[#1D271F]">
                ৳{formatPrice(average)}
              </p>
              <p className="mt-1 text-xs text-gray-500">বাজারগুলোর গড়</p>
            </div>
          </div>
        </section>

        {/* Market price table */}
        <section className="mt-4 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4 sm:p-5">
          <h2 className="text-sm font-bold text-[#1D271F]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-4 overflow-x-auto rounded-xl border border-[#E1E8E1]">
            <table className="w-full min-w-135 border-collapse text-left text-xs">
              <thead className="bg-[#FAFCFA]">
                <tr className="border-b border-[#E1E8E1] text-gray-600">
                  <th className="px-3 py-3 font-semibold sm:px-4">বাজার</th>
                  <th className="px-3 py-3 font-semibold sm:px-4">বিভাগ</th>
                  <th className="px-3 py-3 font-semibold sm:px-4">সর্বনিম্ন</th>
                  <th className="px-3 py-3 font-semibold sm:px-4">সর্বোচ্চ</th>
                  <th className="px-3 py-3 text-right font-semibold sm:px-4">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${market.division}-${index}`}
                    className={`border-b border-[#E1E8E1] last:border-0 ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F0F5F0]"
                    }`}
                  >
                    <td className="px-3 py-3 font-medium sm:px-4">
                      {market.market}
                    </td>
                    <td className="px-3 py-3 text-gray-600 sm:px-4">
                      {market.division}
                    </td>
                    <td className="px-3 py-3 text-green-700 sm:px-4">
                      ৳{formatPrice(market.min)}
                    </td>
                    <td className="px-3 py-3 text-red-600 sm:px-4">
                      ৳{formatPrice(market.max)}
                    </td>
                    <td className="px-3 py-3 text-right font-medium sm:px-4">
                      ৳{formatPrice((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            বাজারদর স্থান ও সময় অনুযায়ী পরিবর্তিত হতে পারে।
          </p>
        </section>
      </main>
    </>
  );
}
