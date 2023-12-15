import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Pokemons, Pokemon } from 'containers';

import './App.css';

const App:React.FC = () =>  {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/:pokemonName" element={<Pokemon />} />
      </Routes>
    </div>
  );
};

export default App;
