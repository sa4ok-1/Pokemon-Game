import axios from 'axios';

export async function getPokemonSprite(pokemonName: string) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    );

    const sprite = response.data.sprites.front_default;

    console.log('Pokemon Front Sprite URL: ', sprite);

    return sprite;
  } catch (error) {
    console.error('Error fetching Pokémon data', error);
  }
}