import React, { useState } from 'react';
import bookmarkContext from './bookmarkContext';

const host = 'http://localhost:5000';

const BookmarkState = (props) => {
  const [bookmarks, setBookmarks] = useState([]);

  // Get all bookmarks
  const getAllBookmarks = async (q = '', tags = '') => {
    let url = `${host}/api/bookmarks`;
    const params = [];
    if (q) params.push(`q=${encodeURIComponent(q)}`);
    if (tags) params.push(`tags=${encodeURIComponent(tags)}`);
    if (params.length) url += '?' + params.join('&');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setBookmarks(json);
  };

  // Add a bookmark
  const addBookmark = async (bookmark) => {
    const response = await fetch(`${host}/api/bookmarks`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookmark),
    });
    if (!response.ok) {
      // Optionally show an alert here
      return;
    }
    const json = await response.json();
    setBookmarks(bookmarks.concat(json));
  };

  // Delete a bookmark
  const deleteBookmark = async (id) => {
    await fetch(`${host}/api/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    setBookmarks(bookmarks.filter((b) => b._id !== id && b.id !== id));
  };

  // Edit a bookmark
  const editBookmark = async (id, updatedFields) => {
    const response = await fetch(`${host}/api/bookmarks/${id}`, {
      method: 'PUT',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    const json = await response.json();
    setBookmarks(
      bookmarks.map((b) => (b._id === id || b.id === id ? { ...b, ...json } : b))
    );
  };

  // Toggle favorite
  const toggleFavorite = async (id, currentFavorite) => {
    await editBookmark(id, { favorite: !currentFavorite });
  };

  return (
    <bookmarkContext.Provider
      value={{
        bookmarks,
        getAllBookmarks,
        addBookmark,
        deleteBookmark,
        editBookmark,
        toggleFavorite,
      }}
    >
      {props.children}
    </bookmarkContext.Provider>
  );
};

export default BookmarkState; 