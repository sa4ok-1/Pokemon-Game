import { useState, useEffect, useRef } from "react";
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
  const selectRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (pokemon: Pokemon) => {
    const isAlreadySelected = value.some((p) => p.name === pokemon.name);

    if (isAlreadySelected) {
      onChange(value.filter((p) => p.name !== pokemon.name));
    } else if (value.length < maxSelections) {
      const newValue = [...value, pokemon];
      onChange(newValue);
      if (newValue.length === maxSelections) {
        setIsOpen(false);
      }
    }

    setSearch("");
  };

  const removePokemon = (pokemon: Pokemon) => {
    onChange(value.filter((p) => p.name !== pokemon.name));
  };

  return (
    <div
      ref={selectRef}
      className="relative w-full"
      style={{ minHeight: "2.5rem" }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Pokemon [Max {maxSelections}]
      </label>
      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
        <input
          type="text"
          value={search}
          style={{ color: "black" }}
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
              className={`p-2 cursor-pointer hover:bg-gray-100 capitalize ${
                value.some((p) => p.name === pokemon.name)
                  ? "bg-blue-200 font-semibold"
                  : ""
              }`}
              style={{ color: "black" }}
            >
              {pokemon.name}
              {value.some((p) => p.name === pokemon.name) && (
                <span className="ml-2 text-blue-600">✔</span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div
        className="mt-2 flex flex-wrap gap-2 w-full"
        style={{ padding: "5px" }}
      >
        {value.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full shadow-md"
          >
            {pokemon.name}
            <button
              onClick={() => removePokemon(pokemon)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
