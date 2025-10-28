import { useState } from 'react';
import { TrendingUp, BookOpen, Star } from 'lucide-react';
import { getBookCover } from '../services/openLibraryApi';

const TrendingBooks = ({ onBookClick }) => {
  const [trendingBooks] = useState([
    {
      key: '/works/OL82565W',
      title: 'The Great Gatsby',
      author_name: ['F. Scott Fitzgerald'],
      first_publish_year: 1925,
      cover_i: 8149765,
      subject: ['American fiction', 'Social classes', 'Wealth']
    },
    {
      key: '/works/OL82566W',
      title: 'To Kill a Mockingbird',
      author_name: ['Harper Lee'],
      first_publish_year: 1960,
      cover_i: 8149766,
      subject: ['Race relations', 'Lawyers', 'Southern States']
    },
    {
      key: '/works/OL82567W',
      title: '1984',
      author_name: ['George Orwell'],
      first_publish_year: 1949,
      cover_i: 8149767,
      subject: ['Dystopian fiction', 'Totalitarianism', 'Surveillance']
    },
    {
      key: '/works/OL82568W',
      title: 'Pride and Prejudice',
      author_name: ['Jane Austen'],
      first_publish_year: 1813,
      cover_i: 8149768,
      subject: ['Romance', 'Social classes', 'Marriage']
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Trending Books</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingBooks.map((book) => {
          const coverUrl = getBookCover(book.cover_i, 'S');
          
          return (
            <div
              key={book.key}
              onClick={() => onBookClick(book.title)}
              className="cursor-pointer group hover:bg-gray-50 rounded-lg p-3 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={`Cover of ${book.title}`}
                      className="w-16 h-24 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
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
                
                <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                  {book.title}
                </h3>
                
                <p className="text-xs text-gray-600 mb-1">
                  {book.author_name[0]}
                </p>
                
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-500">{book.first_publish_year}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Click on any book to search for it
      </p>
    </div>
  );
};

export default TrendingBooks;
