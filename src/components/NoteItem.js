import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote, toggleFavoriteNote } = context;
  const { editNote } = props;
  const { note } = props;

  return (
    <div className="col-md-4">
      <div className="card shadow-sm border-0 my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="card-title mb-0">{note.title}</h5>
            <div>
              <button
                className={`btn btn-sm ${note.favorite ? 'btn-warning' : 'btn-outline-warning'}`}
                title="Toggle Favorite"
                onClick={() => toggleFavoriteNote(note._id, note.favorite)}
              >
                <i className={note.favorite ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
              </button>
              <button
                className="btn btn-sm btn-danger ms-2"
                title="Delete"
                onClick={() => deleteNote(note._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-primary ms-2"
                title="Edit"
                onClick={() => editNote(note)}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          {note.tag && <span className="badge bg-primary me-2">{note.tag}</span>}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
