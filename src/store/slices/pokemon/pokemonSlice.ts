import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PokemonState } from "./interfaces";
import type { PokemonData } from "@/types/pokemon";
import { fetchAllPokemon, fetchPokemonEvolution } from "./pokemonThunk";

const initialState: PokemonState = {
  pokemonList: [],
  evolutions: [],
  visibleCount: 20,
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    loadMore(state) {
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
      })
      .addCase(fetchPokemonEvolution.pending, (state) => {
        state.evolutions = [];
        state.error = null;
      })
      .addCase(
        fetchPokemonEvolution.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.evolutions = action.payload;
        }
      )
      .addCase(fetchPokemonEvolution.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Erro desconhecido";
      });
  },
});

export const { loadMore, resetVisibleCount, resetPokemons } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
