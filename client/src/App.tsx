import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import { Navigate } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/" element={<Navigate to="/game" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
