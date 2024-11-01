import { createSlice } from "@reduxjs/toolkit";

interface themeMode {
  mode: "dark" | "light";
  type: "dark" | "light" | "system";
}


interface preferences {
  themeMode: themeMode;
}
const systemTheme =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : "light";

const initialState: preferences = {
  themeMode: {
    mode: systemTheme,
    type: "system",
  },
};

const userPreferencesSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: "dark" | "light" | "auto" }) => {
      switch (payload) {
        case "light":
          state.themeMode.mode = "light";
          state.themeMode.type = "light";
          break;
        case "dark":
          state.themeMode.mode = "dark";
          state.themeMode.type = "dark";
          break;
        case "auto":
          state.themeMode.mode = systemTheme;
          state.themeMode.type = "system";
          break;

        default:
          break;
      }
    },
    resetPreferences: () => {},
  },

});

export const { setTheme, resetPreferences } = userPreferencesSlice.actions;

export const UserPreferences = userPreferencesSlice.reducer;


