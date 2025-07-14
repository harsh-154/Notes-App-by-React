import React, { useContext, useEffect, useState } from 'react';
import bookmarkContext from '../context/bookmarks/bookmarkContext';
import BookmarkItem from './BookmarkItem';
import AddBookmark from './AddBookmark';

const Bookmarks = ({ setAlertMsg }) => {
  const context = useContext(bookmarkContext);
  const { bookmarks, getAllBookmarks, deleteBookmark } = context;
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    getAllBookmarks();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getAllBookmarks(search, tags);
  };

  const handleDelete = async (id) => {
    await deleteBookmark(id);
    setAlertMsg && setAlertMsg('Bookmark deleted successfully!');
    setTimeout(() => setAlertMsg && setAlertMsg(''), 2000);
  };

  // Split bookmarks into favorites and others
  const favoriteBookmarks = bookmarks.filter((b) => b.favorite);
  const otherBookmarks = bookmarks.filter((b) => !b.favorite);

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold text-primary">
        <i className="fa-solid fa-bookmark me-2"></i>Bookmarks
      </h2>
      <form className="row g-2 mb-4 p-3 rounded shadow-sm border bg-light" onSubmit={handleSearch}>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            Search
          </button>
        </div>
      </form>
      <AddBookmark setAlertMsg={setAlertMsg} />

      {/* Favorites Section */}
      <div className="my-4">
        <h4 className="mb-3 text-warning">
          <i className="fa-solid fa-star me-2"></i>Favourites
        </h4>
        <div className="row">
          {favoriteBookmarks.length === 0 && <p>No favourite bookmarks yet.</p>}
          {favoriteBookmarks.map((bookmark) => (
            <BookmarkItem key={bookmark._id || bookmark.id} bookmark={bookmark} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      {/* All Bookmarks Section */}
      <h4 className="mb-3 text-secondary">
        <i className="fa-regular fa-bookmark me-2"></i>All Bookmarks
      </h4>
      <div className="row">
        {otherBookmarks.length === 0 && <p>No bookmarks to display.</p>}
        {otherBookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark._id || bookmark.id} bookmark={bookmark} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks; 