import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Dropdown from "./components/Dropdown";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Fetch Pokémon list for the dropdown
  const fetchPokemonList = async () => {
    setIsLoading(true); // Set loading to true before the API call
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
      setPokemonList(response.data.results);
    } catch (error) {
      console.error("Failed to fetch Pokémon list:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the API call finishes
    }
  };

  // Fetch selected Pokémon details
  const fetchPokemon = async (pokemonName) => {
    if (!pokemonName) return;
    setIsLoading(true); // Set loading to true before the API call
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      setPokemon(response.data);
    } catch (error) {
      console.error("Pokemon not found!", error);
      setPokemon(null);
    } finally {
      setIsLoading(false); // Set loading to false after the API call finishes
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div className="Container">
      <header className="header">
        <h1>Welcome to PokeDex!</h1>
      </header>
      
      {isLoading && (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}

      <Dropdown
        pokemonList={pokemonList}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        fetchPokemon={fetchPokemon}
      />
      
      {pokemon && (
        <div className="pokemon-details">
          <h2>{pokemon.name}</h2>
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
          />
          <p>
            <strong>Pokémon Type:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>

          <div className="stats">
            {pokemon.stats.map((stat, idx) => (
              <div key={idx} className="stat">
                <span>{stat.stat.name.toUpperCase()}:</span>
                <div className="stat-bar">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${stat.base_stat}%` }}
                  ></div>
                </div>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a) => (
              <button key={a.ability.name} className="ability-btn">
                {a.ability.name}
              </button>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
