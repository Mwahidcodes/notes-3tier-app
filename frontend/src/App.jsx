import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./style.css";

const API_URL = "http://16.170.247.225:5000";

function App() {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}/notes`);
    setNotes(res.data);
  };

  const saveNote = async () => {
    if (!content.trim()) return;
    await axios.post(`${API_URL}/notes`, { content });
    setContent("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1>CI/CD DevOps Assignment</h1>

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={saveNote}>Save Note</button>

      <h2>Saved Notes</h2>
      {notes.map((note) => (
        <div className="note" key={note.id}>
          {note.content}
        </div>
      ))}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);