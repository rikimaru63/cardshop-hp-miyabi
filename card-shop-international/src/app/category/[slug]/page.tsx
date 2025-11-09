import Link from 'next/link';
import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/ui/CategoryPageClient';
import { categories, getProductsByCategory } from '@/lib/data/products';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Find the category
  const category = categories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  // Get all products for this category
  const categoryProducts = getProductsByCategory(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-red-600">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name} Cards</h1>
        {category.description && (
          <p className="text-xl text-gray-600 mb-6">{category.description}</p>
        )}
      </div>

      {/* Category Content with Client-side interactivity */}
      <CategoryPageClient 
        products={categoryProducts} 
        category={category}
      />
    </div>
  );
}