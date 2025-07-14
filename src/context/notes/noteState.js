import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const initialNote = [];
  const [notes, setNote] = useState(initialNote);
  // Get all notes, with optional search by title
  const getAllNotes = async (searchTitle = "") => {
    let url = `${host}/fetchallnotes`;
    if (searchTitle) {
      url += `?q=${encodeURIComponent(searchTitle)}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    setNote(json);
  };
  const addNote = async (title, description, tags) => {
    // tags is an array, join to string for backend
    const response = await fetch(`${host}/addnotes`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, tag: tags.join(",") })
    });
    const json = await response.json();
    setNote(notes.concat(json));
  };
  const deleteNote = async (id) => {
    await fetch(`${host}/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNote(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNote(newNotes);
  };
  // Toggle favorite status of a note
  const toggleFavoriteNote = async (id, currentFavorite) => {
    const response = await fetch(`${host}/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favorite: !currentFavorite })
    });
    const json = await response.json();
    setNote(notes.map((note) => note._id === id ? { ...note, favorite: json.favorite } : note));
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes, toggleFavoriteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
