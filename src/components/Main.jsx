import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import WinnerGif from "./WinnerGif";

const Card = () => {
  const [pokemon, setPokemon] = useState([]);
  const [result, setResult] = useState([""]);

  const [displayResult, setDisplayResult] = useState("");
  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(0);
  const navigate = useNavigate();
  const selectPokemon = (id) => {
    if (s1 === 0) {
      setS1(id);
    } else if (s2 === 0) {
      setS2(id);
    } else {
      setS1(id);
      setS2(0);
    }
  };

  const fetchRandomPokemon = async (count = 15) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${count}`
      );
      const results = response.data.results;

      const pokemonWithImages = await Promise.all(
        results.map(async (pok, index) => {
          const id = index + 1;
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return { ...pok, imageUrl, id };
        })
      );

      setPokemon(pokemonWithImages);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  const fight = async () => {
    const p1 = s1,
      p2 = s2;

    if (!p1 || !p2) {
      alert("Please select two Pokémon to battle!");
      return;
    }

    const level = 50; // Fixed level
    const fetchPokemonData = async (pokemon) => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      return response.data;
    };
    const p1Data = await fetchPokemonData(p1);
    const p2Data = await fetchPokemonData(p2);
    const getRandomMove = (moves) => {
      const randomIndex = Math.floor(Math.random() * moves.length);
      return moves[randomIndex];
    };

    const getDamage = (attacker, defender, move) => {
      const movePower = move.power || 50; // Default power if not available
      const attackStat = attacker.stats[1].base_stat; // Attack
      const defenseStat = defender.stats[2].base_stat; // Defense

      const baseDamage =
        (((2 * level) / 5 + 2) * movePower * (attackStat / defenseStat)) / 50 +
        2;
      return Math.floor(baseDamage);
    };

    const typeEffectiveness = async (attackingType, defendingType) => {
      const typeResponse = await axios.get(
        `https://pokeapi.co/api/v2/type/${attackingType}`
      );
      const effectiveness =
        typeResponse.data.damage_relations.double_damage_to.find(
          (type) => type.name === defendingType
        );
      return effectiveness ? 2 : 1; // Assuming no weaknesses, returns 1 for normal effectiveness
    };

    // Randomly select moves for both Pokémon
    const p1Move = getRandomMove(p1Data.moves.map((m) => m.move));
    const p2Move = getRandomMove(p2Data.moves.map((m) => m.move));

    const p1Damage = getDamage(p1Data, p2Data, p1Move);
    const p2Damage = getDamage(p2Data, p1Data, p2Move);

    const p1Speed = p1Data.stats[5].base_stat;
    const p2Speed = p2Data.stats[5].base_stat;

    let winner;

    if (p1Speed >= p2Speed) {
      console.log(`${p1Data.name} attacks first!`);
      console.log(
        `${p1Data.name} used ${p1Move.name} and dealt ${p1Damage} damage!`
      );
      console.log(
        `${p2Data.name} used ${p2Move.name} and dealt ${p2Damage} damage!`
      );
      setResult((result) => [
        `${p1Data.name} attacks first!`,
        `${p1Data.name} used ${p1Move.name} and dealt ${p1Damage} damage!`
        ,`${p2Data.name} used ${p2Move.name} and dealt ${p2Damage} damage!`,
        ...result,
      ]);

      if (p2Damage < p1Damage) {
        winner = p1Data.name;
      } else {
        winner = p2Data.name;
      }
    } else {
      console.log(`${p2Data.name} attacks first!`);
      console.log(
        `${p2Data.name} used ${p2Move.name} and dealt ${p2Damage} damage!`
      );
      setResult((result) => [
        ...result,
        `${p2Data.name} attacks first!`,
        `${p2Data.name} used ${p2Move.name} and dealt ${p2Damage} damage!`,
        `${p1Data.name} used ${p1Move.name} and dealt ${p1Damage} damage!`
      ]);
      if (p1Damage < p2Damage) {
        winner = p2Data.name;
      } else {
        winner = p1Data.name;
      }
    }

    console.log(`The winner is ${winner}!`);
    setResult((result) => [...result, `The winner is ${winner}!`]);
    console.log("RESULT", result);
    setDisplayResult(winner)
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4">
        {pokemon.map((pok) => {
          const isSelected = pok.id === s1 || pok.id === s2;
          return (
            <div
              onDoubleClick={() => navigate(`/detail/${pok.id}`)}
              key={pok.id}
              className={`rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer
                            ${isSelected ? "bg-red-800" : "bg-white"}`}
              onClick={() => selectPokemon(pok.id)}
            >
              <div
                className={`p-4 ${
                  isSelected ? "bg-red-800" : "bg-white-600"
                } text-black`}
              >
                <img src={`${pok.imageUrl}`} alt="" />
              </div>
              <div className="p-2 text-center text-black">
                <p className="text-sm font-semibold capitalize">{pok.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center flex-col">
        <button className="bg-red-600 p-4 w-32 mt-2 rounded-lg" onClick={fight}>
          FIGHT
        </button>
        
        {
          result.length>=2?<WinnerGif e={displayResult} arr={result}/>:null
        }

      </div>
      
      
    </>
  );
};

export default Card;
