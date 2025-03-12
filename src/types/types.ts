export interface Pokemon {
    name: string;
    url: string;
    sprite?: string;
  }
  
  export interface PokemonDetails {
    sprites: {
      front_default: string;
    };
  }
  
  export interface FormData {
    firstName: string;
    lastName: string;
    pokemonTeam: Pokemon[];
  }