import { createSlice } from "@reduxjs/toolkit";

const initialGameSettings = {
  playerNames: {
    red: "Player 1",
    black: "Player 2",
  },
  opponent: "player",
};

const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState: initialGameSettings,
  reducers: {
    setNames(state, action) {
      const { redName, blackName } = action.payload;
      state.playerNames = {
        red: redName,
        black: blackName,
      };
    },
  },
});

export const gameSettingsReducer = gameSettingsSlice.reducer;
export default gameSettingsSlice.actions;
