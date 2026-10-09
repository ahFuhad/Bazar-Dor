import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import { getProducts } from "../lib/api";

export default async function Home() {
  const products = await getProducts();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Header />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
        <Hero />

        <ProductSection
          title="আজ দাম বেড়েছে ▲"
          description="যেসব পণ্যের দাম আজ বেড়েছে"
          products={risingProducts}
        />

        <ProductSection
          title="আজ দাম কমেছে ▼"
          description="যেসব পণ্যের দাম আজ কমেছে"
          products={fallingProducts}
        />

        <ProductSection
          id="সব-পণ্য"
          title="সব পণ্য"
          description="বাজারের সব প্রয়োজনীয় পণ্যের আজকের দাম"
          products={products}
        />
      </main>
    </>
  );
}