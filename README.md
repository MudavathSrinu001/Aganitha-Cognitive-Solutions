# Book Finder 📚

A modern, responsive web application for discovering books using the Open Library API. Perfect for college students like Alex who want to search for books by title, author, subject, or any keyword.

## Features ✨

- **Smart Search**: Search books by title, author, subject, or any keyword
- **Advanced Search**: Filter by specific criteria (title, author, subject)
- **Book Details**: View cover images, authors, publication year, ratings, and subjects
- **Favorites**: Save books to your personal favorites list
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Trending Books**: Discover popular books with one-click search
- **Load More**: Infinite scroll functionality for browsing large result sets
- **Error Handling**: Graceful error handling with retry options

## Technology Stack 🛠️

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Open Library Search API
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Build Tool**: Vite

## Getting Started 🚀

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage 📖

### Basic Search
- Enter any keyword in the search bar (book title, author name, subject, etc.)
- Click "Search" or press Enter
- Browse through the results

### Advanced Search
- Click "Advanced Search" to reveal additional options
- Fill in specific fields for title, author, or subject
- Click "Advanced Search" to execute the filtered search

### Favorites
- Click the heart icon on any book card to add it to favorites
- Click the "Favorites" button in the header to view your saved books
- Remove books from favorites or clear all favorites

### Trending Books
- Scroll down to see trending books on the homepage
- Click any trending book to search for it instantly

## API Integration 🔌

The application uses the Open Library Search API:

- **Base URL**: `https://openlibrary.org/search.json`
- **Search Parameters**: `q`, `title`, `author`, `subject`, `limit`, `offset`
- **Cover Images**: `https://covers.openlibrary.org/b/id/{coverId}-{size}.jpg`

### Example API Call
```javascript
const response = await fetch(
  'https://openlibrary.org/search.json?title=javascript&limit=20'
);
const data = await response.json();
```

## Project Structure 📁

```
src/
├── components/          # React components
│   ├── BookCard.jsx     # Individual book display
│   ├── BookGrid.jsx     # Books grid layout
│   ├── ErrorMessage.jsx # Error handling
│   ├── FavoritesModal.jsx # Favorites management
│   ├── LoadingSpinner.jsx # Loading states
│   ├── SearchBar.jsx    # Search functionality
│   └── TrendingBooks.jsx # Trending books section
├── hooks/               # Custom React hooks
│   ├── useBookSearch.js # Book search logic
│   └── useFavorites.js  # Favorites management
├── services/            # API services
│   └── openLibraryApi.js # Open Library API integration
├── App.jsx              # Main application component
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## Customization 🎨

### Styling
The application uses Tailwind CSS with a custom color palette. You can modify the colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... other shades
      }
    }
  }
}
```

### Adding New Features
- **New Search Filters**: Add parameters to the `searchBooks` function in `openLibraryApi.js`
- **Additional Book Details**: Extend the book card component to display more information
- **New Pages**: Add routing with React Router if needed

## Deployment 🌐

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```
3. Run: `npm run build && npm run deploy`

## Browser Support 🌍

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing 🤝

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 🙏

- [Open Library](https://openlibrary.org) for providing the free book data API
- [Lucide](https://lucide.dev) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

---

Built with ❤️ for book lovers and college students everywhere!
