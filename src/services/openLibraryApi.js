// Open Library API service
const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, options = {}) => {
  const { 
    title = '', 
    author = '', 
    subject = '', 
    limit = 20, 
    offset = 0 
  } = options;

  try {
    // Build search parameters
    const params = new URLSearchParams();
    
    if (title) params.append('title', title);
    if (author) params.append('author', author);
    if (subject) params.append('subject', subject);
    if (query) params.append('q', query);
    
    params.append('limit', limit);
    params.append('offset', offset);
    params.append('fields', 'key,title,author_name,first_publish_year,cover_i,subject,language,isbn,number_of_pages_median,ratings_average');

    const response = await fetch(`${BASE_URL}/search.json?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const getBookDetails = async (workKey) => {
  try {
    const response = await fetch(`${BASE_URL}${workKey}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const getBookCover = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getAuthorDetails = async (authorKey) => {
  try {
    const response = await fetch(`${BASE_URL}${authorKey}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching author details:', error);
    throw error;
  }
};
