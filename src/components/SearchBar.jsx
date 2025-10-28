import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    title: '',
    author: '',
    subject: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      sessionStorage.setItem('lastSearchQuery', query);
      onSearch(query, searchOptions);
    }
  };

  const handleAdvancedSearch = () => {
    const hasAdvancedOptions = searchOptions.title || searchOptions.author || searchOptions.subject;
    if (hasAdvancedOptions) {
      sessionStorage.setItem('lastSearchQuery', 'advanced');
      onSearch('', searchOptions);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchOptions({ title: '', author: '', subject: '' });
    onSearch('', {});
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Main Search Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books by title, author, or any keyword..."
              className="input-field pl-10 pr-4 py-3 text-lg"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Advanced Search Toggle */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <Filter className="w-4 h-4" />
          Advanced Search
        </button>
        
        {query || Object.values(searchOptions).some(v => v) ? (
          <button
            onClick={clearSearch}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
            Clear Search
          </button>
        ) : null}
      </div>

      {/* Advanced Search Options */}
      {showAdvanced && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Advanced Search Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={searchOptions.title}
                onChange={(e) => setSearchOptions(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Book title..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                value={searchOptions.author}
                onChange={(e) => setSearchOptions(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Author name..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={searchOptions.subject}
                onChange={(e) => setSearchOptions(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Subject/genre..."
                className="input-field"
              />
            </div>
          </div>
          <button
            onClick={handleAdvancedSearch}
            disabled={loading || !Object.values(searchOptions).some(v => v)}
            className="mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Advanced Search'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
