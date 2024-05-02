import React, { useState } from 'react';
import './Home.css';

const Error = ({ message }) => <div className="error-message">{message}</div>;

const Note = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedNote(prevNote => ({ ...prevNote, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editedNote);
    setIsEditing(false);
  };

  const handleModifiedClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>{isEditing ? <input type="text" name="title" value={editedNote.title} onChange={handleEditChange} maxLength={50} /> : note.title}</h3>
        <div className="close-icon" onClick={onDelete}>X</div>
      </div>
      <p className="note-text">
        {isEditing ? <textarea name="text" value={editedNote.text} onChange={handleEditChange} maxLength={300} /> : note.text}
      </p>
      <div className="note-info">
        <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
        <p onClick={handleModifiedClick}>Modified: {new Date(note.modifiedAt).toLocaleString()}</p>
      </div>
      {isEditing && <button onClick={handleSave}>Save</button>}
    </div>
  );
};

const Home = () => {
  const [noteInput, setNoteInput] = useState({ title: '', text: '' });
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title" && value.length > 50) {
      setError("Title cannot exceed 50 characters!");
    } else if (name === "text" && value.length > 300) {
      setError("Note text cannot exceed 300 characters!");
    } else {
      setError('');
      setNoteInput(prevNote => ({ ...prevNote, [name]: value }));
    }
  };

  const onLogin = () => {
    console.log('Logged in successfully!');
  };


  const addNote = () => {
    const { title, text } = noteInput;
    const trimmedTitle = title.trim();
    const trimmedText = text.trim();

    if (!trimmedTitle || !trimmedText) {
      setError("Please write something in the note!");
      return;
    }

    const newNote = {
      title: trimmedTitle,
      text: trimmedText,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString()
    };

    setNotes([...notes, newNote]);
    setNoteInput({ title: '', text: '' });
    setError('');
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const editNote = (index, updatedNote) => {
    const newNotes = [...notes];
    newNotes[index] = { ...updatedNote, modifiedAt: new Date().toISOString() };
    setNotes(newNotes);
  };

  return (
    <div className="grid-container">
      <div className="column">
        <div className='content'>
          <input 
              type="text"
              name="title"
              value={noteInput.title} 
              onChange={handleChange} 
              placeholder="Title" 
              aria-label="Title"
              maxLength={50}
            />
            <textarea 
              name="text"
              value={noteInput.text} 
              onChange={handleChange} 
              placeholder="Write a note..." 
              aria-label="Write a note"
              maxLength={300}
            />
            {error && <Error key="error" message={error} />}
            <button className="addNoteButton" onClick={addNote}>Add Note</button>
        </div>
      </div>

      <div className="column">
        {notes.map((note, index) => (
          <Note 
            key={index} 
            note={note} 
            onDelete={() => deleteNote(index)} 
            onEdit={(updatedNote) => editNote(index, updatedNote)}
          />
        ))}
      </div>
      
    </div>
  );
};

export default Home;