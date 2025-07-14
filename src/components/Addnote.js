import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";
const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        // Split tags by comma and trim
        const tagsArray = note.tag.split(',').map(t => t.trim()).filter(Boolean);
        addNote(note.title, note.description, tagsArray);
        setNote({ title: "", description: "", tag: "" });
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" placeholder='atleast 5 characters' name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" placeholder='atleast 5 characters' name="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder="Tag (comma separated)" />
                    </div>
                    <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    )
}
export default Addnote;
