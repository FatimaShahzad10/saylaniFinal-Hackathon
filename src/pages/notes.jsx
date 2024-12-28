import React, { useState } from "react";
import { collection, addDoc , serverTimestamp } from "firebase/firestore"; // Import only necessary functions
import { db } from "../config/config.js";

const Notes = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNotesSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);

    try {
      const notesData = {
        title,
        description,
        createdAt: new Date(),
        lastEditedAt: serverTimestamp(), 
      };
console.log(notesData)
      // Use addDoc() to create a new document with an auto-generated ID
      const docRef = await addDoc(collection(db, "notes"), notesData);
      console.log("Document written with ID:", docRef.id);
      alert("Note created successfully!");

      // Clear the form fields after successful submission
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-10">
      <form onSubmit={handleNotesSubmit} className="flex flex-col gap-5">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent w-fit">
          Create Notes
        </h1>
        <input
          type="text"
          className="w-full px-4 py-2 border-2 rounded-full font-bold text-primary placeholder:text-primary placeholder:font-bold"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full px-4 py-2 border-2 rounded-2xl min-h-40 font-bold text-primary placeholder:text-primary placeholder:font-bold"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-fit font-bold bg-gradient-to-r to-primary from-secondary text-white py-2 px-4 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Notes;