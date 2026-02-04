import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TableFile from "./components/TableFile";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/table" element={<TableFile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
