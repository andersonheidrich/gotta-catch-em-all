/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pokeAPI } from "@/services/pokeAPI";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PokemonData } from "@/types/pokemon";

interface PokemonState {
  pokemonList: PokemonData[];
  visibleCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  visibleCount: 20,
  loading: false,
  error: null,
};

// Fetch todos os Pokémon
export const fetchAllPokemon = createAsyncThunk<
  PokemonData[],
  number | "all",
  { rejectValue: string }
>("pokemon/fetchAll", async (generationId, { rejectWithValue }) => {
  try {
    let species: any[] = [];

    if (generationId === "all") {
      const response = await pokeAPI.get("pokemon?limit=1025");
      species = response.data.results;
    } else {
      const response = await pokeAPI.get(`generation/${generationId}`);
      species = response.data.pokemon_species;
    }

    const detailed = await Promise.all(
      species.map(async (poke: any) => {
        try {
          const res = await pokeAPI.get(`pokemon/${poke.name}`);
          const sprite =
            res.data.sprites.other?.["official-artwork"]?.front_default ||
            res.data.sprites.other?.home?.front_default ||
            res.data.sprites.front_default ||
            "";
          return {
            id: res.data.id,
            name: res.data.name,
            sprite,
            types: res.data.types,
            height: res.data.height,
            weight: res.data.weight,
            abilities: res.data.abilities,
            stats: res.data.stats,
            url: res.data.url,
          };
        } catch {
          return null;
        }
      })
    );

    const validPokemons = detailed.filter(Boolean) as PokemonData[];
    validPokemons.sort((a, b) => a.id - b.id);

    return validPokemons;
  } catch (err: any) {
    return rejectWithValue(err.message || "Erro ao carregar Pokémon");
  }
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    loadMore(state) {
      // Aumenta 20 Pokémon visíveis, sem ultrapassar o total
      state.visibleCount = Math.min(
        state.visibleCount + 20,
        state.pokemonList.length
      );
    },
    resetVisibleCount(state) {
      state.visibleCount = 20;
    },
    resetPokemons(state) {
      state.pokemonList = [];
      state.visibleCount = 20;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllPokemon.fulfilled,
        (state, action: PayloadAction<PokemonData[]>) => {
          state.pokemonList = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido";
      });
  },
});

export const { loadMore, resetVisibleCount, resetPokemons } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
