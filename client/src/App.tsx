import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { researchTick } from "./features/base/research/researchSlice.ts";
import { mineTick } from "./features/mine_main/ore/oreSlice.ts";
import { smeltTick } from "./features/base/furnace/furnaceSlice.ts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(researchTick());
      dispatch(mineTick());
      dispatch(smeltTick());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);
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
