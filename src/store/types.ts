export interface IGameSlice {
  board: string[][];
  selected: string;
  possibleCaptures: string[];
  currentPlayer: string;
}
