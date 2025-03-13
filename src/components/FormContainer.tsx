import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PokemonSelect } from "./PokemonSelect";
import { PokemonModal } from "./PokemonModal";
import { FormData } from "../types/types";

export const FormContainer = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      pokemonTeam: [],
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (_data: FormData) => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black text-center">
        Create your own team of Pokémon
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
              value.length === 4 || "You must select exactly 4 Pokémon",
          }}
          render={({ field }) => (
            <PokemonSelect value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.pokemonTeam && (
          <p className="text-red-500 text-sm">{errors.pokemonTeam.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
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
