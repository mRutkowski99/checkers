import { createSlice } from "@reduxjs/toolkit";
import { IGameSlice } from "./types";
import {
  clearActiveFields,
  findMoves,
  checkPromotes,
} from "../utilities/utilities";

const initialGameState: IGameSlice = {
  board: [
    ["bp", "-", "bp", "-", "bp", "-", "bp", "-"],
    ["-", "bp", "-", "bp", "-", "bp", "-", "bp"],
    ["bp", "-", "bp", "-", "bp", "-", "bp", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "rp", "-", "rp", "-", "rp", "-", "rp"],
    ["rp", "-", "rp", "-", "rp", "-", "rp", "-"],
    ["-", "rp", "-", "rp", "-", "rp", "-", "rp"],
  ],
  selected: "",
  possibleCaptures: {},
  currentPlayer: "red",
  movesWithoutCapture: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    clickPawn(state, action) {
      const { id, color, isKing } = action.payload;

      //Highlight selected pawn. If pawn was selected again remove highlight
      if (state.selected === id) state.selected = "";
      else state.selected = id;

      //If no pawn is selected clear active (move there is possible) squares
      if (!state.selected) {
        state.board = clearActiveFields(state.board);
        state.possibleCaptures = {};
        return;
      }

      state.board = clearActiveFields(state.board); //Clear active squares from previous selection

      //Find possible moves and mark squares as active
      const { possibleMoves: movesForward, possibleCaptures: capturesForward } =
        findMoves(id, color, state.board);

      const movesBackward = isKing
        ? findMoves(id, color, state.board, -1).possibleMoves
        : [];

      const capturesBackward = isKing
        ? findMoves(id, color, state.board, -1).possibleCaptures
        : {};

      const possibleMoves = [...movesForward, ...movesBackward];

      possibleMoves.forEach((move) => {
        const [row, col] = move.split("/");
        state.board[+row][+col] = "a";
      });

      //Mark possible captures
      state.possibleCaptures = {
        ...capturesForward,
        ...capturesBackward,
      };
    },

    selectMove(state, action) {
      const { id } = action.payload;

      if (!state.selected) return;

      const [moveRow, moveCol] = id.split("/");
      const [pieceRow, pieceCol] = state.selected.split("/");

      //Move selected piece to clicked square and change its previous square to empty
      state.board[+moveRow][+moveCol] = state.board[+pieceRow][+pieceCol];
      state.board[+pieceRow][+pieceCol] = "-";

      //Remove captured pieces
      const capturesPieces = state.possibleCaptures[id];

      if (capturesPieces) {
        capturesPieces.forEach((captured) => {
          const [capturedRow, capturedCol] = captured.split("/");
          state.board[+capturedRow][+capturedCol] = "-";
        });
      }

      //Check promotes
      state.board = checkPromotes(state.board);

      //Reset selected piece and clear possible moves
      state.selected = "";
      state.board = clearActiveFields(state.board);
      state.possibleCaptures = {};

      //Change player
      if (state.currentPlayer === "red") state.currentPlayer = "black";
      else state.currentPlayer = "red";
    },
  },
});

export const gameReducer = gameSlice.reducer;
export default gameSlice.actions;
