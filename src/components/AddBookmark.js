import React, { useContext, useState } from 'react';
import bookmarkContext from '../context/bookmarks/bookmarkContext';

const AddBookmark = ({ setAlertMsg, setAlertType }) => {
  const context = useContext(bookmarkContext);
  const { addBookmark } = context;
  const [bookmark, setBookmark] = useState({ url: '', title: '', description: '', tag: '', favorite: false });

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!bookmark.url) {
      setAlertType && setAlertType('danger');
      setAlertMsg && setAlertMsg('URL is required!');
      setTimeout(() => setAlertMsg && setAlertMsg(''), 2000);
      return;
    }
    if (!isValidUrl(bookmark.url)) {
      setAlertType && setAlertType('danger');
      setAlertMsg && setAlertMsg('Please enter a valid URL (e.g. https://example.com)');
      setTimeout(() => setAlertMsg && setAlertMsg(''), 2000);
      return;
    }
    addBookmark(bookmark);
    setBookmark({ url: '', title: '', description: '', tag: '', favorite: false });
    setAlertType && setAlertType('success');
    setAlertMsg && setAlertMsg('Bookmark added!');
    setTimeout(() => setAlertMsg && setAlertMsg(''), 2000);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookmark({ ...bookmark, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <form className="mb-4">
      <div className="row g-2 align-items-end">
        <div className="col-md-3">
          <input type="url" className="form-control" name="url" placeholder="URL" value={bookmark.url} onChange={onChange} required />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" name="title" placeholder="Title (optional)" value={bookmark.title} onChange={onChange} />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" name="description" placeholder="Description" value={bookmark.description} onChange={onChange} />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" name="tag" placeholder="Tag" value={bookmark.tag} onChange={onChange} />
        </div>
        <div className="col-md-1 form-check">
          <input type="checkbox" className="form-check-input" name="favorite" checked={bookmark.favorite} onChange={onChange} id="favoriteCheck" />
          <label className="form-check-label" htmlFor="favoriteCheck">Fav</label>
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100" onClick={handleClick}>
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBookmark; 