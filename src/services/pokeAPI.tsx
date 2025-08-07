import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokemon = async (nameOrId: string) => {
  const response = await api.get(`pokemon/${nameOrId}`);
  return response.data;
};

export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};
