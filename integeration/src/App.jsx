import { useState } from "react";
import "./App.css";
import SignUp from "./components/Signup";
import Registration from "./components/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashoboard from "./components/Dashoboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashoboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
