
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/session/login";
import AllNotes from "./pages/allNotes";
import Notes from "./pages/notes";
import AuthWrapper from "./components/sessions/authWrapper";
import Register from "./components/forms/signupForm";

function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all/notes" element={<AllNotes />} />
        <Route path="/notes" element={<Notes />} />
    
      
      </Routes>
    </AuthWrapper>
  );
}

export default App;
