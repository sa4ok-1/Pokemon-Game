import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonDetails } from "../types/types";

interface PokemonModalProps {
  team: Pokemon[];
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonModal = ({ team, isOpen, onClose }: PokemonModalProps) => {
  const [sprites, setSprites] = useState<string[]>([]);

  useEffect(() => {
    const fetchSprites = async () => {
      const spritePromises = team.map((pokemon) =>
        axios
          .get<PokemonDetails>(pokemon.url)
          .then((res) => res.data.sprites.front_default)
      );
      const results = await Promise.all(spritePromises);
      setSprites(results);
    };
    if (isOpen && team.length > 0) {
      fetchSprites();
    }
  }, [team, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Pokemon Team
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {team.map((pokemon, index) => (
            <div key={pokemon.name} className="text-center">
              <img
                src={sprites[index]}
                alt={pokemon.name}
                className="w-20 h-20 mx-auto"
              />
              <p className="capitalize">{pokemon.name}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};
