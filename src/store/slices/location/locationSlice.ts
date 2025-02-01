import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Location {
  id: string;
  address: string;
  lat: number;
  lng: number;
}

const initialState: Array<Location> = [];

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      const newState = state.filter(
        (location) => location.id !== action.payload.id
      );
      newState.unshift(action.payload);
      return newState;
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      return state.filter((location) => location.id !== action.payload);
    },
    clearLocations: () => {
      return [];
    },
  },
});

export const { addLocation, removeLocation, clearLocations } =
  locationSlice.actions;

export const locationSelector = (state: { location: Array<Location> }) =>
  state.location;
export default locationSlice.reducer;
