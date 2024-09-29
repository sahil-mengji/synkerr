import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [speciesDetail, setSpeciesDetail] = useState(null);

  const getDetail = async () => {
    try {
      // Fetch general Pokémon details
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemonDetail(response.data);

      // Fetch species details for color, shape, egg groups, and location
      const speciesResponse = await axios.get(response.data.species.url);
      setSpeciesDetail(speciesResponse.data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (!pokemonDetail || !speciesDetail) {
    return <div>Loading...</div>;
  }

  // Extract necessary details
  const { name, height, weight, stats, abilities, moves } = pokemonDetail;
  const { color, shape, egg_groups, habitat } = speciesDetail;

  return (
    <div className="pokemon-detail w-full max-w-[400px] p-8">
      <h1>{name.toUpperCase()}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
      />

      <h3>Details:</h3>
      <p>
        <strong>Height:</strong> {height}
      </p>
      <p>
        <strong>Weight:</strong> {weight}
      </p>

      <h3>Base Stats:</h3>
      <ul>
        {stats.map((stat) => (
          <li key={stat.stat.name}>
            <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
          </li>
        ))}
      </ul>

      <h3>Abilities:</h3>
      <ul>
        {abilities.map((ability) => (
          <li key={ability.ability.name}>
            {ability.is_hidden ? <em>(Hidden)</em> : ""}{" "}
            {ability.ability.name.toUpperCase()}
          </li>
        ))}
      </ul>

      <h3>Moves:</h3>
      <ul>
        {moves.slice(0, 5).map((move) => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>

      <h3>Other Info:</h3>
      <p>
        <strong>Color:</strong> {color.name}
      </p>
      <p>
        <strong>Shape:</strong> {shape.name}
      </p>
      <p>
        <strong>Egg Groups:</strong>{" "}
        {egg_groups.map((egg) => egg.name).join(", ")}
      </p>
      <p>
        <strong>Location:</strong> {habitat ? habitat.name : "Unknown"}
      </p>
    </div>
  );
};

export default Detail;
