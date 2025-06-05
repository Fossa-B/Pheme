import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const stored = await AsyncStorage.getItem('bookmarkedArticles');
      if (stored) setBookmarks(JSON.parse(stored));
    };
    loadBookmarks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (article) => {
    if (!bookmarks.find(item => item.url === article.url)) {
      setBookmarks(prev => [...prev, article]);
    }
  };

  const removeBookmark = (url) => {
    setBookmarks(prev => prev.filter(item => item.url !== url));
  };

  const isBookmarked = (url) => {
    return bookmarks.some(item => item.url === url);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);