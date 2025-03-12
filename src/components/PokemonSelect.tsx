import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Pokemon } from "../types/types";

interface PokemonSelectProps {
  value: Pokemon[];
  onChange: (pokemon: Pokemon[]) => void;
  maxSelections?: number;
}

export const PokemonSelect = ({
  value,
  onChange,
  maxSelections = 4,
}: PokemonSelectProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      setPokemonList(response.data.results);
      setFilteredList(response.data.results);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredList(filtered);
  }, [search, pokemonList]);

  const handleSelect = (pokemon: Pokemon) => {
    if (
      value.length < maxSelections &&
      !value.some((p) => p.name === pokemon.name)
    ) {
      onChange([...value, pokemon]);
    }
    setSearch("");
    setIsOpen(false);
  };

  const removePokemon = (pokemon: Pokemon) => {
    onChange(value.filter((p) => p.name !== pokemon.name));
  };

  return (
    <div className="relative w-full" style={{ minHeight: "2.5rem" }}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Your Pokemon Team (Max {maxSelections})
      </label>
      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search Pokemon..."
          className="w-full outline-none"
        />
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 cursor-pointer transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
          {filteredList.map((pokemon) => (
            <li
              key={pokemon.name}
              onClick={() => handleSelect(pokemon)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap gap-2 w-full overflow-x-auto">
        {value.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded whitespace-nowrap"
          >
            {pokemon.name}
            <button
              onClick={() => removePokemon(pokemon)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
