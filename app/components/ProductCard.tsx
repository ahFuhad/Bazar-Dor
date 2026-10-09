import Link from "next/link";
import type { Product } from "../../lib/api";
import PriceBadge from "./PriceBadge";

type ProductCardProps = {
    product: Product;
};

function getUnitText(unit: string) {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "litre") return "প্রতি লিটার";
    if (unit === "dozen") return "প্রতি ডজন";
    if (unit === "piece") return "প্রতি পিস";

    return unit;
}

function formatNumber(number: number) {
    return new Intl.NumberFormat("bn-BD").format(number);
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
        href={`/product/${product.slug}`}
        className="group block rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-4 transition hover:border-[#05893E] hover:shadow-md"
        >
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
            {product.image}
            </div>

            <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">
                {product.nameBn}
            </h3>

            <p className="text-xs text-[#1D271F]/60">
                {getUnitText(product.unit)}
            </p>
            </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
            <div>
            <p className="text-xs text-[#1D271F]/60">আজকের দাম</p>

            <p className="text-xl font-bold">
                {formatNumber(product.today)} টাকা
            </p>
            </div>

            <PriceBadge
            direction={product.change.dir}
            percentage={product.change.pct}
            />
        </div>
        </Link>
    );
}