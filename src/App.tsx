import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Pokemons from './containers/Pokemons/Pokemons';
import Pokemon from './containers/Pokemon/Pokemon';

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
