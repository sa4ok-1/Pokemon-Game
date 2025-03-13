import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { PokemonSelect } from "./PokemonSelect";
import { PokemonModal } from "./PokemonModal";
import { FormData } from "../types/types";

export const FormContainer = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      pokemonTeam: [],
    },
    mode: "onBlur",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = (data: FormData) => {
    const existingTeams = sessionStorage.getItem("savedTeams");
    const teams = existingTeams ? JSON.parse(existingTeams) : [];

    teams.push(data);
    sessionStorage.setItem("savedTeams", JSON.stringify(teams));

    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black text-center">
        Create your own team of Pokemon
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "First name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
              maxLength: { value: 12, message: "Maximum 12 characters" },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Only letters allowed",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                onBlur={() => {
                  field.onBlur();
                  trigger("firstName");
                }}
                className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400"
                style={{ color: "black" }}
                placeholder="Enter your name..."
              />
            )}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "Last name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
              maxLength: { value: 12, message: "Maximum 12 characters" },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Only letters allowed",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                onBlur={() => {
                  field.onBlur();
                  trigger("lastName");
                }}
                className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400"
                style={{ color: "black" }}
                placeholder="Enter your last name..."
              />
            )}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <Controller
          name="pokemonTeam"
          control={control}
          rules={{
            validate: (value) =>
              value.length === 4 || "You must select exactly 4 Pokemon",
          }}
          render={({ field }) => (
            <PokemonSelect
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                trigger("pokemonTeam");
              }}
            />
          )}
        />
        {errors.pokemonTeam && (
          <p className="text-red-500 text-sm">{errors.pokemonTeam.message}</p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full bg-gradient-to-r text-white py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 ${
            isValid
              ? "from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              : "from-gray-400 to-gray-600 cursor-not-allowed"
          }`}
        >
          Submit Team
        </button>
      </form>

      <PokemonModal
        team={control._formValues.pokemonTeam}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
