import { FunctionComponent } from "react";

export interface IGameSlice {
  board: string[][];
  selected: string;
  possibleCaptures: {
    [key: string]: string[];
  };
  currentPlayer: string;
  movesWithoutCapture: number;
  result: string;
  capturedPieces: {
    [key: string]: number;
  };
}

export interface IModalSlice {
  isOpen: boolean;
  content: string | FunctionComponent;
  playerNames: {
    red: string;
    black: string;
  };
}
