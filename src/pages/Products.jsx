import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/cards/ProductCard';
import SkeletonCard from '../components/common/SkeletonCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCats, setSelectedCats] = useState(() => {
    const cat = searchParams.get('category');
    return cat ? [cat] : [];
  });
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);
  const perPage = 12;

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer); }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedCats.length > 0) result = result.filter(p => selectedCats.includes(p.category));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    if (inStockOnly) result = result.filter(p => p.inStock);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [search, selectedCats, priceRange, minRating, inStockOnly, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [search, selectedCats, priceRange, minRating, inStockOnly, sort]);

  const toggleCat = (c) => {
    setSelectedCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };
  const clearFilters = () => { setSelectedCats([]); setPriceRange([0, 50000]); setMinRating(0); setInStockOnly(false); setSearch(''); };
  const activeCount = selectedCats.length + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-poppins font-semibold text-text-dark mb-3">Categories</h4>
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-2 mb-2 text-sm font-poppins text-text-mid cursor-pointer hover:text-maroon">
            <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCat(cat)} className="accent-maroon" />
            {cat}
          </label>
        ))}
      </div>
      <div>
        <h4 className="font-poppins font-semibold text-text-dark mb-3">Price Range</h4>
        <div className="space-y-2">
          <input type="range" min={0} max={50000} step={100} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full accent-maroon" />
          <div className="flex justify-between text-xs text-text-mid font-poppins">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-poppins font-semibold text-text-dark mb-3">Rating</h4>
        {[4, 3, 0].map(r => (
          <label key={r} className="flex items-center gap-2 mb-2 text-sm font-poppins text-text-mid cursor-pointer hover:text-maroon">
            <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-maroon" />
            {r > 0 ? `${r}★ & Up` : 'Any'}
          </label>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm font-poppins text-text-mid cursor-pointer hover:text-maroon">
        <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)} className="accent-maroon" />
        In Stock Only
      </label>
      <button onClick={clearFilters} className="btn-outline w-full text-sm py-2">Clear All Filters</button>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      {/* Header */}
      <div className="bg-maroon pt-36 md:pt-40 lg:pt-44 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white">All Products</h1>
          <div className="flex items-center gap-2 text-white/70 text-sm font-poppins mt-2">
            <Link to="/" className="hover:text-yellow">Home</Link> <span>/</span> <span>Products</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button onClick={() => setMobileFilters(true)}
              className="lg:hidden btn-outline text-sm py-2 px-4 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            <p className="text-sm text-text-mid font-poppins">Showing {paged.length} of {filtered.length} products</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-maroon font-poppins" />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-maroon font-poppins">
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[260px] flex-shrink-0 sticky top-24 self-start">
            <FilterSidebar />
          </div>

          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paged.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-poppins font-semibold text-text-dark mb-2">No products match your filters</h3>
                <p className="text-text-mid font-poppins mb-4">Try adjusting your filter criteria</p>
                <button onClick={clearFilters} className="btn-secondary">Clear Filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-poppins text-sm font-semibold transition-colors ${page === i + 1 ? 'bg-maroon text-white' : 'border border-gray-300 hover:bg-maroon/10'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-maroon hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileFilters(false)}>
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            onClick={e => e.stopPropagation()} className="absolute top-0 left-0 h-full w-80 bg-white overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-playfair font-bold text-maroon">Filters</h3>
              <button onClick={() => setMobileFilters(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <FilterSidebar />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Products;
