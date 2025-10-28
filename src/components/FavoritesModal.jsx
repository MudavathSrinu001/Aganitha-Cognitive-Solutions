import { Heart, X, BookOpen, Calendar, User } from 'lucide-react';
import { getBookCover } from '../services/openLibraryApi';

const FavoritesModal = ({ isOpen, onClose, favorites, onRemoveFavorite, onClearFavorites }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              My Favorite Books ({favorites.length})
            </h2>
          </div>
          <div className="flex gap-2">
            {favorites.length > 0 && (
              <button
                onClick={onClearFavorites}
                className="btn-secondary text-sm"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Heart className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite books yet</h3>
              <p className="text-gray-500">Start searching for books and add them to your favorites!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map((book) => {
                const coverUrl = getBookCover(book.cover_i);
                const authors = book.author_name || ['Unknown Author'];
                
                return (
                  <div key={book.key} className="card p-4">
                    <div className="flex gap-3">
                      {/* Cover */}
                      <div className="flex-shrink-0">
                        {coverUrl ? (
                          <img
                            src={coverUrl}
                            alt={`Cover of ${book.title}`}
                            className="w-16 h-24 object-cover rounded shadow-sm"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-16 h-24 bg-gray-200 rounded shadow-sm flex items-center justify-center ${coverUrl ? 'hidden' : 'flex'}`}
                        >
                          <BookOpen className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                          {book.title}
                        </h3>
                        <div className="flex items-center gap-1 mb-1">
                          <User className="w-3 h-3 text-gray-500" />
                          <p className="text-sm text-gray-600">
                            {authors.join(', ')}
                          </p>
                        </div>
                        {book.first_publish_year && (
                          <div className="flex items-center gap-1 mb-2">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <p className="text-sm text-gray-600">{book.first_publish_year}</p>
                          </div>
                        )}
                        <button
                          onClick={() => onRemoveFavorite(book.key)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove from favorites
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
