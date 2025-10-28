import { Heart, Calendar, User, BookOpen, Star } from 'lucide-react';
import { getBookCover } from '../services/openLibraryApi';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
  const coverUrl = getBookCover(book.cover_i);
  const authors = book.author_name || ['Unknown Author'];
  const publishYear = book.first_publish_year;
  const pages = book.number_of_pages_median;
  const rating = book.ratings_average;
  const subjects = book.subject ? book.subject.slice(0, 3) : [];

  return (
    <div className="card p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex gap-4">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-24 h-36 object-cover rounded-lg shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={`w-24 h-36 bg-gray-200 rounded-lg shadow-sm flex items-center justify-center ${coverUrl ? 'hidden' : 'flex'}`}
          >
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {book.title}
            </h3>
            <button
              onClick={() => onToggleFavorite(book)}
              className={`ml-2 p-1 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Authors */}
          <div className="flex items-center gap-1 mb-2">
            <User className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">
              {authors.join(', ')}
            </p>
          </div>

          {/* Publication Year */}
          {publishYear && (
            <div className="flex items-center gap-1 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-600">{publishYear}</p>
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <p className="text-sm text-gray-600">
                {rating.toFixed(1)} ({book.ratings_count || 0} ratings)
              </p>
            </div>
          )}

          {/* Pages */}
          {pages && (
            <div className="flex items-center gap-1 mb-3">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-600">{pages} pages</p>
            </div>
          )}

          {/* Subjects/Tags */}
          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
