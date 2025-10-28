import { useState } from 'react';
import { Heart, BookOpen, Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import TrendingBooks from './components/TrendingBooks';
import FavoritesModal from './components/FavoritesModal';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { useBookSearch } from './hooks/useBookSearch';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  const { books, loading, error, hasSearched, totalResults, search, loadMore, resetSearch, canLoadMore } = useBookSearch();
  const { favorites, toggleFavorite, removeFromFavorites, clearFavorites, favoritesCount } = useFavorites();

  const handleSearch = (query, options) => {
    search(query, options);
  };

  const handleTrendingClick = (bookTitle) => {
    search(bookTitle);
  };

  const handleRetry = () => {
    const lastQuery = sessionStorage.getItem('lastSearchQuery');
    if (lastQuery) {
      search(lastQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Book Finder</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFavorites(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Favorites</span>
                {favoritesCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Your Next Great Read
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search millions of books by title, author, or subject. Perfect for college students 
              looking for textbooks, novels, or research materials.
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Content Area */}
        {error ? (
          <ErrorMessage error={error} onRetry={handleRetry} />
        ) : hasSearched ? (
          <BookGrid
            books={books}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            loading={loading}
            onLoadMore={loadMore}
            canLoadMore={canLoadMore}
          />
        ) : (
          <div className="space-y-8">
            {/* Welcome Message */}
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to find your next book?
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Use the search bar above to find books, or check out some trending titles below.
              </p>
            </div>

            {/* Trending Books */}
            <TrendingBooks onBookClick={handleTrendingClick} />
          </div>
        )}
      </main>

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemoveFavorite={removeFromFavorites}
        onClearFavorites={clearFavorites}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Powered by the <a href="https://openlibrary.org" className="text-primary-600 hover:text-primary-700">Open Library API</a>
            </p>
            <p className="text-sm">
              Built for college students who love to read and discover new books.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
