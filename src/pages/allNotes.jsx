import React , {useState , useEffect , useCallback} from 'react';
import Footer from "../components/footer/footer";
import { Link, useSearchParams } from "react-router-dom";
import { collection, query, where, doc , getDocs , updateDoc , serverTimestamp} from "firebase/firestore";
import { db } from "../config/config";
import CourseCard from "../components/cards/notesCard";
import Navbar from "../components/Header/Navbar";
//import { useAuthCtx } from "../sessions/authWrapper";

function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  //const { user } = useAuthCtx();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("title") || ""
  );
 // const { currentUser } = useAuth(); 

    const fetchNotes = useCallback(async (queryText = "") => {
      setLoading(true);
      setError(null);
      try {
            const notesRef = collection(db, "notes");
            let q;
      
            if (queryText) {
              q = query(
                notesRef,
                where("title", ">=", queryText),
                where("title", "<=", queryText + "\uf8ff")
              );
            } else {
              q = query(notesRef); // Fetch all courses if no query
            }
      console.log(q)
            const querySnapshot = await getDocs(q);
            const fetchedNotes = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes(fetchedNotes);
          } catch (error) {
            console.error("Error fetching notes:", error);
            setError("Failed to notes. Please try again later.");
          } finally {
            setLoading(false);
          }
        }, []);
      
        const handleSearch = (e) => {
          const searchValue = e.target.value;
          setSearchQuery(searchValue);
      
          // Update URL search params
          if (searchValue) {
            setSearchParams({ title: searchValue });
          } else {
            setSearchParams({});
          }
      
          // Debounce fetch
          const timeoutId = setTimeout(() => {
            fetchNotes(searchValue);
          }, 300);
      
          return () => clearTimeout(timeoutId);
        };
      
        useEffect(() => {
          fetchNotes(searchQuery);
        }, [fetchNotes, searchQuery]);

        //update notes
        const handleNoteUpdate = async (noteId, updatedDescription) => { 
          try {
            const noteRef = doc(db, 'notes', noteId);
            await updateDoc(noteRef, {
              description: updatedDescription,
              lastEditedAt: serverTimestamp(),
            });
            console.log('Note updated successfully.' );
            
          } catch (error) {
            console.error('Error updating document: ', error);
          
          }
        };
      
  return (
    <>
<Navbar />
      <div className="min-h-screen w-full p-10 bg-gradient-to-b from-secondary/20 to-primary/20">
        <div className="flex flex-col z-30 space-y-7">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent w-fit">
           All Notes
          </h1>
          <div className="flex items-center justify-between">
            <input
              className="w-96 px-4 py-2 rounded-full font-bold text-primary placeholder:text-primary placeholder:font-bold"
              placeholder="Search by Title"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-5 flex-wrap">
            {loading ? (
              <p>Loading notes...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : notes.length > 0 ? (
                notes.map((note) => (
                <Link to={`/notes`} key={note.id}>
                  
                  <CourseCard
                    title={note.title}
                    description={note.description}
                    handleNoteUpdate={handleNoteUpdate}
                   
                  />
                </Link>
              ))
            ) : (
              <p>No notes found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AllNotes
