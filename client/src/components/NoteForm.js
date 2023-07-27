import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const NoteForm = ({ note, onNoteSaved }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [description, setDescription] = useState(note ? note.description : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      if (note) {
        await axios.put(`http://localhost:8080/api/note/${note._id}`, {
          title,
          description,
        });
      } else {
        await axios.post(`http://localhost:8080/api/note/`, {
          title,
          description,
          createdDate: moment().toDate(),
          isArchived: false,
        });
      }

      setTitle("");
      setDescription("");
      onNoteSaved();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>{note ? "Edit" : "Create"} Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
