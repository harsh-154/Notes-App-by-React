import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

function Notes() {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token'))
      getAllNotes();
    else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refCl = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refCl.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    getAllNotes(search);
  };

  // Split notes into favorites and others
  const favoriteNotes = notes.filter((n) => n.favorite);
  const otherNotes = notes.filter((n) => !n.favorite);

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold text-primary">
        <i className="fa-solid fa-note-sticky me-2"></i>Notes
      </h2>
      <form className="row g-2 mb-4 p-3 rounded shadow-sm border bg-light" onSubmit={handleSearch}>
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Search notes by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="mb-4 p-3 rounded shadow-sm border bg-light">
        <Addnote />
      </div>

      {/* Favorites Section */}
      <div className="my-4">
        <h4 className="mb-3 text-warning">
          <i className="fa-solid fa-star me-2"></i>Favourites
        </h4>
        <div className="row">
          {favoriteNotes.length === 0 && <p>No favourite notes yet.</p>}
          {favoriteNotes.map((note) => (
            <NoteItem key={note._id} note={note} editNote={updateNote} />
          ))}
        </div>
      </div>

      {/* All Notes Section */}
      <h4 className="mb-3 text-secondary">
        <i className="fa-regular fa-note-sticky me-2"></i>All Notes
      </h4>
      <div className="row">
        {otherNotes.length === 0 && <p>No notes to display.</p>}
        {otherNotes.map((note) => (
          <NoteItem key={note._id} note={note} editNote={updateNote} />
        ))}
      </div>

      {/* ...existing modal code... */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refCl}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.etitle} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required value={note.edescription} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} required value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refCl}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
