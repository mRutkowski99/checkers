import { createSlice } from "@reduxjs/toolkit";
import { IGameSlice } from "./types";
import {
  clearActiveFields,
  findMoves,
  checkPromotions,
  checkIfWinner,
} from "../helpers/gameLogic";

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
  result: "",
  capturedPieces: {
    red: 0,
    black: 0,
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    selectPiece(state, action) {
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

      const { possibleMoves, possibleCaptures } = findMoves(
        id,
        color,
        state.board,
        isKing
      );

      possibleMoves.forEach((move) => {
        const [row, col] = move.split("/");
        state.board[+row][+col] = "a";
      });

      //Mark possible captures
      state.possibleCaptures = possibleCaptures;
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
      const capturedPieces = state.possibleCaptures[id];

      if (capturedPieces) {
        capturedPieces.forEach((captured) => {
          const [capturedRow, capturedCol] = captured.split("/");
          state.board[+capturedRow][+capturedCol] = "-";
        });

        state.movesWithoutCapture = 0;

        state.capturedPieces[state.currentPlayer] += capturedPieces.length;
      } else {
        state.movesWithoutCapture++;
      }

      //Check promotes
      state.board = checkPromotions(state.board);

      //Reset selected piece and clear possible moves
      state.selected = "";
      state.board = clearActiveFields(state.board);
      state.possibleCaptures = {};

      //Check if someone win
      if (checkIfWinner(state.currentPlayer, state.board))
        state.result = state.currentPlayer;

      //Check if draw
      if (state.movesWithoutCapture === 15) state.result = "draw";

      //Change player
      if (state.currentPlayer === "red") state.currentPlayer = "black";
      else state.currentPlayer = "red";
    },

    resetGame(state) {
      state.board = initialGameState.board;
      state.currentPlayer = "red";
      state.movesWithoutCapture = 0;
      state.result = "";
      state.capturedPieces = initialGameState.capturedPieces;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export default gameSlice.actions;
