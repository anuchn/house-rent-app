import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddHouse from "./pages/AddHouse";
import EditHouse from "./pages/EditHouse";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddHouse />} />
        <Route path="/edit/:id" element={<EditHouse />} />
      </Routes>
    </Router>
  );
}

export default App;