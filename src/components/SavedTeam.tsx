import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PokemonDetails, FormData } from "../types/types";

export const SavedTeam = () => {
  const [savedTeams, setSavedTeams] = useState<FormData[]>([]);
  const [sprites, setSprites] = useState<string[][]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("savedTeams");
    if (data) {
      const parsedTeams: FormData[] = JSON.parse(data);
      setSavedTeams(parsedTeams);

      const fetchSprites = async () => {
        const teamSprites = await Promise.all(
          parsedTeams.map(async (team) => {
            const spritePromises = team.pokemonTeam.map((pokemon) =>
              axios
                .get<PokemonDetails>(pokemon.url)
                .then((res) => res.data.sprites.front_default)
            );
            return Promise.all(spritePromises);
          })
        );
        setSprites(teamSprites);
      };
      fetchSprites();
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  if (!savedTeams.length) {
    return (
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">No Saved Teams</h2>
        <p>Please create and submit a team first.</p>
        <button
          onClick={handleBack}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Team Creator
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Your Saved Teams
      </h2>

      {savedTeams.map((team, teamIndex) => (
        <div
          key={teamIndex}
          className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              <span className="font-medium">Team {teamIndex + 1}:</span>{" "}
              {team.firstName} {team.lastName}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {team.pokemonTeam.map((pokemon, pokeIndex) => (
              <div key={pokemon.name} className="text-center">
                <img
                  src={sprites[teamIndex]?.[pokeIndex]}
                  alt={pokemon.name}
                  className="w-20 h-20 mx-auto"
                />
                <p className="capitalize text-gray-800">{pokemon.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleBack}
        className="mt-6 w-full max-w-md mx-auto block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Back to Team Creator
      </button>
    </div>
  );
};
