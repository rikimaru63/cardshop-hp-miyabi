import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Star, 
  ArrowLeft, 
  Package, 
  Shield, 
  Truck
} from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import ProductImageGallery from '@/components/ui/ProductImageGallery';
import CartAddButton from '@/components/ui/CartAddButton';
import ProductDetailsTabs from '@/components/ui/ProductDetailsTabs';
import { getProductById, products } from '@/lib/data/products';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Get related products from the same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? getDiscountPercentage(product.originalPrice, product.price) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-red-600">Products</Link>
        <span>/</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-red-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <ProductImageGallery product={product} />

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>{product.category}</span>
              {product.set && (
                <>
                  <span>•</span>
                  <span>{product.set}</span>
                </>
              )}
              {product.cardNumber && (
                <>
                  <span>•</span>
                  <span>#{product.cardNumber}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.5) • 24 reviews</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-green-600 font-medium">
                You save {formatPrice(product.originalPrice - product.price)} ({discountPercentage}% off)
              </div>
            )}
          </div>

          {/* Card Details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            {product.rarity && (
              <div>
                <span className="text-sm text-gray-600">Rarity</span>
                <div className={cn(
                  "inline-block px-3 py-1 rounded-full text-sm font-medium mt-1",
                  {
                    'bg-gray-100 text-gray-600': product.rarity === 'Common',
                    'bg-blue-100 text-blue-600': product.rarity === 'Rare',
                    'bg-purple-100 text-purple-600': product.rarity === 'Super Rare',
                    'bg-yellow-100 text-yellow-600': product.rarity === 'Ultra Rare',
                    'bg-red-100 text-red-600': product.rarity === 'Secret Rare',
                  }
                )}>
                  {product.rarity}
                </div>
              </div>
            )}
            {product.condition && (
              <div>
                <span className="text-sm text-gray-600">Condition</span>
                <div className="font-medium">{product.condition}</div>
              </div>
            )}
            {product.language && (
              <div>
                <span className="text-sm text-gray-600">Language</span>
                <div className="font-medium">{product.language}</div>
              </div>
            )}
            <div>
              <span className="text-sm text-gray-600">Stock</span>
              <div className="font-medium">
                {product.stock > 10 ? (
                  <span className="text-green-600">In Stock ({product.stock})</span>
                ) : product.stock > 0 ? (
                  <span className="text-yellow-600">Only {product.stock} left</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <CartAddButton product={product} />

          {/* Features */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-green-600" />
              <span className="text-sm">Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm">100% authentic guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-purple-600" />
              <span className="text-sm">Express shipping available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <ProductDetailsTabs product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <Link
              href={`/category/${product.category.toLowerCase()}`}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              View all {product.category} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}