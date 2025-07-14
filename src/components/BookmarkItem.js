import React, { useContext } from 'react';
import bookmarkContext from '../context/bookmarks/bookmarkContext';

const BookmarkItem = ({ bookmark, onDelete }) => {
  const context = useContext(bookmarkContext);
  const { deleteBookmark, toggleFavorite } = context;

  const handleDelete = async () => {
    await deleteBookmark(bookmark._id);
    onDelete && onDelete(bookmark._id);
  };

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title mb-0">
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                {bookmark.title || bookmark.url}
              </a>
            </h5>
            <div>
              <button
                className={`btn btn-sm ${bookmark.favorite ? 'btn-warning' : 'btn-outline-warning'}`}
                title="Toggle Favorite"
                onClick={() => toggleFavorite(bookmark._id, bookmark.favorite)}
              >
                <i className={bookmark.favorite ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
              </button>
              <button
                className="btn btn-sm btn-danger ms-2"
                title="Delete"
                onClick={handleDelete}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <p className="card-text mt-2">{bookmark.description}</p>
          <span className="badge bg-primary me-2">{bookmark.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItem; 