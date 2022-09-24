import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListBooks from "./Components/ListBooks";
import Search from "./Components/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/" element={<ListBooks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
