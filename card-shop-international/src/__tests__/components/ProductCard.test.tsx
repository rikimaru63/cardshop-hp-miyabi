import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ui/ProductCard';
import { useCartStore } from '@/stores/cartStore';

// Mock the cart store
jest.mock('@/stores/cartStore');

const mockProduct = {
  id: 'test-1',
  name: 'Charizard Base Set',
  price: 298000,
  originalPrice: 358000,
  description: 'A rare Charizard card from the base set',
  category: 'Pokemon',
  subcategory: 'Base Set',
  imageUrl: 'https://example.com/charizard.jpg',
  stock: 3,
  rarity: 'UR',
  condition: 'A',
  set: 'Base Set',
  cardNumber: '4/102',
  language: 'Japanese',
  featured: true,
  isNew: false,
  onSale: true,
};

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      addItem: jest.fn(),
      items: [],
    });
  });

  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Charizard Base Set')).toBeInTheDocument();
    expect(screen.getByText('¥298,000')).toBeInTheDocument();
    expect(screen.getByText('¥358,000')).toBeInTheDocument(); // Original price
    expect(screen.getByText('UR')).toBeInTheDocument(); // Rarity
    expect(screen.getByText('在庫: 3')).toBeInTheDocument();
  });

  it('should show sale badge when product is on sale', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('SALE')).toBeInTheDocument();
  });

  it('should show new badge when product is new', () => {
    const newProduct = { ...mockProduct, isNew: true, onSale: false };
    render(<ProductCard product={newProduct} />);
    
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('should handle add to cart click', () => {
    const mockAddItem = jest.fn();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
      items: [],
    });

    render(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /カートに追加/i });
    fireEvent.click(addButton);

    expect(mockAddItem).toHaveBeenCalledWith({
      id: 'test-1',
      name: 'Charizard Base Set',
      price: 298000,
      quantity: 1,
      imageUrl: 'https://example.com/charizard.jpg',
      stock: 3,
    });
  });

  it('should disable add to cart when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /在庫切れ/i });
    expect(addButton).toBeDisabled();
  });

  it('should display PSA grade if present', () => {
    const psaProduct = { ...mockProduct, condition: 'PSA10' };
    render(<ProductCard product={psaProduct} />);
    
    expect(screen.getByText('PSA10')).toBeInTheDocument();
  });

  it('should format large prices correctly', () => {
    const expensiveProduct = { ...mockProduct, price: 5800000 };
    render(<ProductCard product={expensiveProduct} />);
    
    expect(screen.getByText('¥5,800,000')).toBeInTheDocument();
  });

  it('should handle missing optional fields gracefully', () => {
    const minimalProduct = {
      id: 'min-1',
      name: 'Minimal Card',
      price: 1000,
      category: 'Pokemon',
      imageUrl: 'https://example.com/card.jpg',
      stock: 1,
    };

    render(<ProductCard product={minimalProduct} />);
    
    expect(screen.getByText('Minimal Card')).toBeInTheDocument();
    expect(screen.getByText('¥1,000')).toBeInTheDocument();
    expect(screen.queryByText('SALE')).not.toBeInTheDocument();
    expect(screen.queryByText('NEW')).not.toBeInTheDocument();
  });
});