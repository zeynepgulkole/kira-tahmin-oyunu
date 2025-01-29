import { useState } from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <p className="lg:m-5 lg:text-2xl m-3 text-lg">Kira Tahmin Oyunu</p>
      <Game />
    </div>
  );
}

export default App;
