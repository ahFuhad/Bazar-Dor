import type { Product } from "../../lib/api";
import ProductCard from "./ProductCard";

type ProductSectionProps = {
    title: string;
    products: Product[];
    id?: string;
    description?: string;
};

export default function ProductSection({
    title,
    products,
    id,
    description,
}: ProductSectionProps) {
    return (
        <section id={id} className="scroll-mt-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
            <h2 className="text-xl font-bold text-[#1D271F]">
                {title}
            </h2>

            {description && (
                <p className="mt-1 text-sm text-[#1D271F]/70">
                {description}
                </p>
            )}
            </div>

            <p className="text-xs text-[#1D271F]/60">
            {new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্য
            </p>
        </div>

        {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        ) : (
            <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-6 text-center text-sm text-[#1D271F]/60">
            এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
            </div>
        )}
        </section>
    );
}