"use client";

import { useState } from "react";
import type { Product } from "../../lib/api";
import ProductCard from "./ProductCard";

type CategoryProductListProps = {
    products: Product[];
};

type SortOption = "default" | "low-high" | "high-low" | "change";

export default function CategoryProductList({
    products,
    }: CategoryProductListProps) {
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const sortedProducts = [...products];

    if (sortBy === "low-high") {
        sortedProducts.sort((a, b) => a.today - b.today);
    } else if (sortBy === "high-low") {
        sortedProducts.sort((a, b) => b.today - a.today);
    } else if (sortBy === "change") {
        sortedProducts.sort(
        (a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)
        );
    }

    return (
        <>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#1D271F]/60">
            মোট পণ্য: {new Intl.NumberFormat("bn-BD").format(products.length)}টি
            </p>

            <div className="flex items-center gap-3">
            <label
                htmlFor="product-sort"
                className="shrink-0 text-sm font-semibold"
            >
                সাজান:
            </label>

            <select
                id="product-sort"
                value={sortBy}
                onChange={(event) =>
                setSortBy(event.target.value as SortOption)
                }
                className="w-full rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] px-3 py-2 text-sm outline-none focus:border-[#05893E] sm:w-auto"
            >
                <option value="default">ডিফল্ট</option>
                <option value="low-high">দাম: কম থেকে বেশি</option>
                <option value="high-low">দাম: বেশি থেকে কম</option>
                <option value="change">দামের পরিবর্তন: সর্বাধিক</option>
            </select>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </>
    );
}