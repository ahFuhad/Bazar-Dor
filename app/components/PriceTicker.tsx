const tickerProducts = [
    {
        icon: "🧅",
        name: "পেঁয়াজ",
        price: "৫৪",
        unit: "টাকা/কেজি",
        change: "১২.৫%",
        direction: "up",
    },
    {
        icon: "🥔",
        name: "আলু",
        price: "৩০",
        unit: "টাকা/কেজি",
        change: "৬.২%",
        direction: "down",
    },
    {
        icon: "🫚",
        name: "আদা",
        price: "৮৫",
        unit: "টাকা/কেজি",
        change: "৯.০%",
        direction: "up",
    },
    {
        icon: "🐟",
        name: "রুই মাছ",
        price: "৪৬",
        unit: "টাকা/কেজি",
        change: "৪.৫%",
        direction: "up",
    },
    {
        icon: "🥚",
        name: "ডিম",
        price: "১৫৮",
        unit: "টাকা/ডজন",
        change: "৩.৯%",
        direction: "up",
    },
    {
        icon: "🧄",
        name: "রসুন",
        price: "১২৫",
        unit: "টাকা/কেজি",
        change: "৭.৪%",
        direction: "down",
    },
];

export default function PriceTicker() {
    const items = [...tickerProducts, ...tickerProducts];

    return (
        <div className="overflow-hidden border-b border-[#E1E8E1] bg-[#FAFCFA]">
        <div className="ticker-track flex h-9.25 w-max items-center">
            {items.map((product, index) => (
            <div
                key={`${product.name}-${index}`}
                className="flex shrink-0 items-center gap-2 px-5 text-sm"
            >
                <span>{product.icon}</span>

                <span className="font-medium">
                {product.name}
                </span>

                <span className="text-[#1D271F]/70">
                {product.price} {product.unit}
                </span>

                <span
                className={
                    product.direction === "up"
                    ? "font-semibold text-[#D03739]"
                    : "font-semibold text-[#1A9951]"
                }
                >
                {product.direction === "up" ? "▲" : "▼"} {product.change}
                </span>
            </div>
            ))}
        </div>
        </div>
    );
}