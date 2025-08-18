import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  darkMode: boolean;
  loading: boolean;
}

const initialState: UIState = {
  darkMode: false,
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleDarkMode, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
