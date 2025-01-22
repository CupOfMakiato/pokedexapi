import React from "react";
import "./Dropdown.css";

const Dropdown = ({ pokemonList, selectedPokemon, setSelectedPokemon, fetchPokemon }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPokemon(selectedValue); // Update the selected Pokémon
    fetchPokemon(selectedValue); // Fetch Pokémon details immediately
  };

  return (
    <div className="dropdown-container">
      <select value={selectedPokemon} onChange={handleChange}>
        <option value="">Select a Pokémon</option>
        {pokemonList.map((pokemon, idx) => (
          <option key={idx} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>
    </div>
  );
};
  
export default Dropdown;
