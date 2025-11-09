'use client';

import React, { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp, RotateCcw, DollarSign, Package, Star, Shield } from 'lucide-react';
import { useSearchStore } from '@/stores/searchStore';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { Select } from './Select';
import { cn } from '@/lib/utils';
import { GameType, CardCondition } from '@prisma/client';

interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

function FilterSection({ title, icon, children, defaultOpen = true, className }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b border-gray-200 pb-4", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

interface CheckboxFilterProps {
  options: Array<{ value: string; count: number; label?: string }>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  maxVisible?: number;
}

function CheckboxFilter({ options, selectedValues, onChange, maxVisible = 10 }: CheckboxFilterProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? options : options.slice(0, maxVisible);

  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter(v => v !== value));
    }
  };

  return (
    <div className="space-y-2">
      {visibleOptions.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-700"
        >
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
          />
          <span className="flex-1">
            {option.label || option.value}
          </span>
          <span className="text-gray-400 text-xs">
            ({option.count})
          </span>
        </label>
      ))}
      
      {options.length > maxVisible && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAll ? 'Show Less' : `Show ${options.length - maxVisible} More`}
        </button>
      )}
    </div>
  );
}

interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  currency: 'USD' | 'JPY';
  availableRange: { min: number; max: number } | null;
  onChange: (min?: number, max?: number) => void;
}

function PriceRangeFilter({ min, max, currency, availableRange, onChange }: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState(min?.toString() || '');
  const [localMax, setLocalMax] = useState(max?.toString() || '');

  const handleMinChange = (value: string) => {
    setLocalMin(value);
    const numValue = value ? parseFloat(value) : undefined;
    onChange(numValue, max);
  };

  const handleMaxChange = (value: string) => {
    setLocalMax(value);
    const numValue = value ? parseFloat(value) : undefined;
    onChange(min, numValue);
  };

  const currencySymbol = currency === 'USD' ? '$' : '¥';
  const step = currency === 'USD' ? '0.01' : '1';

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="price-min" className="text-xs text-gray-600">
            Min {currencySymbol}
          </Label>
          <Input
            id="price-min"
            type="number"
            step={step}
            min="0"
            placeholder="0"
            value={localMin}
            onChange={(e) => handleMinChange(e.target.value)}
            className="text-sm"
          />
        </div>
        <div>
          <Label htmlFor="price-max" className="text-xs text-gray-600">
            Max {currencySymbol}
          </Label>
          <Input
            id="price-max"
            type="number"
            step={step}
            min="0"
            placeholder="Any"
            value={localMax}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="text-sm"
          />
        </div>
      </div>
      
      {availableRange && (
        <div className="text-xs text-gray-500">
          Available range: {currencySymbol}{availableRange.min.toLocaleString()} - {currencySymbol}{availableRange.max.toLocaleString()}
        </div>
      )}
    </div>
  );
}

export function FilterSidebar() {
  const {
    filters,
    availableFilters,
    isFilterSidebarOpen,
    closeFilterSidebar,
    setGameTypes,
    setRarities,
    setConditions,
    setPriceRange,
    setStockStatus,
    setCurrency,
    clearFilters,
    search,
  } = useSearchStore();

  const handleApplyFilters = () => {
    search();
  };

  const gameTypeLabels: Record<GameType, string> = {
    POKEMON: 'Pokémon',
    ONE_PIECE: 'One Piece',
    DRAGON_BALL: 'Dragon Ball',
    YUGIOH: 'Yu-Gi-Oh!',
    MTG: 'Magic: The Gathering',
    DIGIMON: 'Digimon',
    WEISS_SCHWARZ: 'Weiss Schwarz',
    OTHER: 'Other',
  };

  const conditionLabels: Record<CardCondition, string> = {
    MINT: 'Mint',
    NEAR_MINT: 'Near Mint',
    EXCELLENT: 'Excellent',
    GOOD: 'Good',
    LIGHT_PLAYED: 'Lightly Played',
    PLAYED: 'Played',
    POOR: 'Poor',
  };

  const stockStatusOptions = [
    { value: 'all', label: 'All Items', count: 0 },
    { value: 'in_stock', label: 'In Stock', count: 0 },
    { value: 'out_of_stock', label: 'Out of Stock', count: 0 },
  ];

  // Transform available filters into checkbox format
  const gameTypeOptions = availableFilters?.gameTypes.map(item => ({
    value: item.value,
    count: item.count,
    label: gameTypeLabels[item.value as GameType] || item.value,
  })) || [];

  const rarityOptions = availableFilters?.rarities || [];

  const conditionOptions = availableFilters?.conditions.map(item => ({
    value: item.value,
    count: item.count,
    label: conditionLabels[item.value as CardCondition] || item.value,
  })) || [];

  const priceRange = availableFilters?.priceRange 
    ? (filters.currency === 'USD' 
        ? { min: availableFilters.priceRange.min.usd, max: availableFilters.priceRange.max.usd }
        : { min: availableFilters.priceRange.min.jpy, max: availableFilters.priceRange.max.jpy })
    : null;

  if (!isFilterSidebarOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={closeFilterSidebar}
      />

      {/* Sidebar */}
      <div className={cn(
        "fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-xl",
        "transform transition-transform duration-300 ease-in-out",
        "lg:relative lg:transform-none lg:shadow-none lg:w-64",
        "overflow-y-auto"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h2 className="font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <button
              onClick={closeFilterSidebar}
              className="p-1 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter content */}
        <div className="p-4 space-y-6">
          {/* Currency Selection */}
          <FilterSection title="Currency" icon={<DollarSign className="h-4 w-4" />}>
            <Select
              value={filters.currency}
              onValueChange={(value: 'USD' | 'JPY') => setCurrency(value)}
            >
              <option value="USD">USD ($)</option>
              <option value="JPY">JPY (¥)</option>
            </Select>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range" icon={<DollarSign className="h-4 w-4" />}>
            <PriceRangeFilter
              min={filters.priceMin}
              max={filters.priceMax}
              currency={filters.currency}
              availableRange={priceRange}
              onChange={setPriceRange}
            />
          </FilterSection>

          {/* Game Type */}
          <FilterSection title="Game Type" icon={<Star className="h-4 w-4" />}>
            <CheckboxFilter
              options={gameTypeOptions}
              selectedValues={filters.gameTypes}
              onChange={(values) => setGameTypes(values as GameType[])}
            />
          </FilterSection>

          {/* Condition */}
          <FilterSection title="Condition" icon={<Shield className="h-4 w-4" />}>
            <CheckboxFilter
              options={conditionOptions}
              selectedValues={filters.conditions}
              onChange={(values) => setConditions(values as CardCondition[])}
            />
          </FilterSection>

          {/* Rarity */}
          <FilterSection title="Rarity" icon={<Star className="h-4 w-4" />}>
            <CheckboxFilter
              options={rarityOptions}
              selectedValues={filters.rarities}
              onChange={setRarities}
            />
          </FilterSection>

          {/* Stock Status */}
          <FilterSection title="Availability" icon={<Package className="h-4 w-4" />}>
            <div className="space-y-2">
              {stockStatusOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-700"
                >
                  <input
                    type="radio"
                    name="stock-status"
                    value={option.value}
                    checked={filters.stockStatus === option.value}
                    onChange={(e) => setStockStatus(e.target.value as any)}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 border-t border-gray-200 bg-white">
          <div className="space-y-2">
            <Button
              onClick={handleApplyFilters}
              className="w-full"
              size="lg"
            >
              Apply Filters
            </Button>
            <div className="text-xs text-center text-gray-500">
              {availableFilters?.gameTypes?.reduce((sum, item) => sum + item.count, 0) || 0} products match your filters
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile filter button component
export function MobileFilterButton() {
  const { toggleFilterSidebar } = useSearchStore();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleFilterSidebar}
      className="lg:hidden"
    >
      <Filter className="h-4 w-4 mr-2" />
      Filters
    </Button>
  );
}