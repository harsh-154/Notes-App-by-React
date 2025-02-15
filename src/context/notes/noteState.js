import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host='http://localhost:5000';
  const initialNote=[];
  const [notes, setNote] = useState(initialNote);
  const getAllNotes=async()=>{
    const response = await fetch(`${host}/fetchallnotes`,{
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    console.log(json);
    setNote(json);
    // console.log('adding a new note');
    
    
  }
  const addNote=async(title,description,tag)=>{
    // API CALL
    const response = await fetch(`${host}/addnotes`,{
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    // console.log(json);


    // SIMPLE
    
    setNote(notes.concat(json));
  }
  const deleteNote=async(id)=>{
    // API CALL
    const response = await fetch(`${host}/deletenotes/${id}`,{
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    const json=await response.json();
    console.log(json);

    // console.log('deleting a note '+ id);
    const newNotes=notes.filter((note)=>{return note._id!==id});
    setNote(newNotes);
  }
  
  
  const editNote=async (id,title,description,tag)=>{
    // API CALL 
    const response = await fetch(`${host}/updatenotes/${id}`,{
      method: 'PUT',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=await response.json();
    console.log(json);
    // CLIENT SIDE CHANGE
    const newNotes=JSON.parse(JSON.stringify(notes));
    for(let index=0;index<newNotes.length;index++){
      const element=newNotes[index];
      if(element._id===id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNote(newNotes);
  }
  return( <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
    {props.children}
    </NoteContext.Provider>
  )
};
export default NoteState;
