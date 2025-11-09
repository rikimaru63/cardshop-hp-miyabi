'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SearchBar } from './SearchBar';

export function MobileSearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Search className="h-4 w-4 mr-2" />
        <span className="text-gray-500">Search for cards...</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <SearchBar
              placeholder="Search for trading cards..."
              className="w-full"
              showFilters={true}
              showSuggestions={true}
            />
          </div>
        </div>
      )}
    </>
  );
}