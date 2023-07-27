import React, { useState } from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import "./App.css";

const App = () => {
  const [noteData, setNoteData] = useState(null);
  const [refreshNotes, setRefreshNotes] = useState(false);

  const handleNoteSaved = () => {
    setRefreshNotes(!refreshNotes);
  };

  const handleEditData = (data) => {
    setNoteData(data);
  };

  return (
    <div className="App">
      <NoteForm note={noteData} onNoteSaved={handleNoteSaved} />
      <NoteList refreshNotes={refreshNotes} editNote={handleEditData} />
    </div>
  );
};

export default App;
