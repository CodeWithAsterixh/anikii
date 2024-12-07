import { createSlice } from "@reduxjs/toolkit";

export type sideBarSizes = "small" | "full";
const initialState: { size: sideBarSizes } = {
  size: "small",
};

const SideBarSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    setSideBarSize: (state, { payload }: { payload: sideBarSizes }) => {
      switch (payload) {
        case "full":
          state.size = "full";
          break;
        case "small":
          state.size = "small";
          break;

        default:
          break;
      }
    },
  },
});

export const { setSideBarSize } = SideBarSlice.actions;

export const SideBarPreference = SideBarSlice.reducer;
