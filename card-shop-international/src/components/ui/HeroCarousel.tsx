'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  buttonText: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: 'PSA鑑定済みカード',
    subtitle: '高品質保証のプレミアムカードをお楽しみください',
    image: '/api/placeholder/980/350',
    link: '/category/psa-graded',
    buttonText: 'PSA商品を見る',
  },
  {
    id: 2,
    title: 'ポケモンカード最新弾',
    subtitle: '人気の新商品が続々入荷中',
    image: '/api/placeholder/980/350',
    link: '/category/pokemon',
    buttonText: 'ポケモンカードを見る',
  },
  {
    id: 3,
    title: 'ワンピースカード',
    subtitle: '話題沸騰中のワンピースカードゲーム',
    image: '/api/placeholder/980/350',
    link: '/category/one-piece',
    buttonText: 'ワンピースカードを見る',
  },
  {
    id: 4,
    title: '全品送料無料キャンペーン',
    subtitle: '期間限定！今なら全商品送料無料でお届け',
    image: '/api/placeholder/980/350',
    link: '/products',
    buttonText: 'キャンペーン商品を見る',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-[980px] h-[350px] mx-auto overflow-hidden rounded-lg bg-gray-100">
      {/* Slides */}
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={slide.id === 1}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6 opacity-90">{slide.subtitle}</p>
                <Link
                  href={slide.link}
                  className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        aria-label="前のスライド"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        aria-label="次のスライド"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`スライド ${index + 1} へ`}
          />
        ))}
      </div>
    </div>
  );
}