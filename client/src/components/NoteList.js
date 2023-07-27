import React, { useEffect, useState } from "react";
import axios from "axios";

const NoteList = ({ refreshNotes, editNote }) => {
  const [notes, setNotes] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/note");
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [refreshNotes]);

  const updateNote = (note) => {
    editNote(note);
  };

  const deleteNote = async (id) => {
    try {
      // Make a DELETE request to delete the note with the given ID
      await axios.delete(`http://localhost:8080/api/note/${id}`);

      // Fetch the updated notes list
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleArchiveNote = async (id, isArchived) => {
    try {
      // Make a PUT request to toggle the archive status of the note with the given ID
      await axios.put(`http://localhost:8080/api/note/${id}`, {
        isArchived: !isArchived,
      });

      // Fetch the updated notes list
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowArchived = () => {
    setShowArchived(!showArchived);
  };

  const NoteTable = ({ note, onEditNote }) => (
    <tr key={note._id}>
      <td>{note.title}</td>
      <td>{note.description}</td>
      <td>{note.createdDate}</td>
      <td>{note.isArchived.toString()}</td>
      <td>
        <button onClick={() => onEditNote(note)}>Edit</button>
        <button onClick={() => deleteNote(note._id)}>Delete</button>
        <button onClick={() => toggleArchiveNote(note._id, note.isArchived)}>
          {note.isArchived ? "Unarchive" : "Archive"}
        </button>
      </td>
    </tr>
  );

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <label>Show Archived Notes:</label>
        <input
          type="checkbox"
          checked={showArchived}
          onChange={toggleShowArchived}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Archived</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes
            .filter((note) => showArchived || !note.isArchived)
            .map((note) => (
              <NoteTable key={note._id} note={note} onEditNote={updateNote} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteList;
