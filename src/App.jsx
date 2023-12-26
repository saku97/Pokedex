import React, { useState, useEffect } from 'react';
import './App.css'
const Pokemon = ({ name, image, types }) => (
  <div className='Pokemon' style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '200px' }}>
    <img src={image} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
    <h3>{name}</h3>
    <p>Types: {types.join(', ')}</p>
  </div>
  
);

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();

        const results = data.results;

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();

            const { name, types } = detailsData;
            const image = detailsData.sprites.front_default;

            return { name, types: types.map((type) => type.type.name), image };
          })
        );

        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className='dex'>
      <h1 className='title'>Pokedex/Pokegallery </h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {pokemonData.map((pokemon, index) => (
        <Pokemon key={index} {...pokemon} />
      ))}
    </div>
    </div>
  );
};

export default App