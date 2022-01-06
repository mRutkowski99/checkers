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
