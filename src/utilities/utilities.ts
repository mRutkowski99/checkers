export const clearActiveFields = (board: string[][]) => {
  //clear board from active field (place where piece can possibly move)

  return board.map((row) =>
    row.map((square) => (square === "a" ? "-" : square))
  );
};

const isCoordValid = (id: string) => {
  const [row, col] = id.split("/");
  if (+row < 0 || +row > 7) return false;
  if (+col < 0 || +col > 7) return false;
  return true;
};

interface ICaptures {
  [key: string]: string;
}

export const findMoves = (id: string, color: string, board: string[][]) => {
  const possibleMoves: string[] = []; //stores coordinates of possible moves
  const possibleCaptures: string[] = [];
  // const possibleCapturedPieces: string[] = [];
  const possibleCapturedPieces: ICaptures = {};

  //Red pawn move 'up' and black pawn moves 'down'. Every row is array's element which store squares.
  //So to find move for red pawn we need to check previous element (row) and for black pawn following element (row)
  const direction = color === "red" ? -1 : 1;
  const enemyColor = color === "red" ? "b" : "r";

  const calcMoves = (
    row: string,
    col: string,
    onlyCaptures: boolean = false
  ) => {
    //Pawns can only move on diagonals so the possible moves are squares on the left and right in the previous/following row
    const moves = [
      `${+row + direction}/${+col - 1}`,
      `${+row + direction}/${+col + 1}`,
    ];

    //Filtering coordinates which are beyond board
    const filteredMoves = moves.filter((move) => isCoordValid(move));
    if (filteredMoves.length === 0) return;

    filteredMoves.forEach((move, i) => {
      const [moveRow, moveCol] = move.split("/");

      if (board[+moveRow][+moveCol] === "-" && !onlyCaptures)
        possibleMoves.push(move);

      if (board[+moveRow][+moveCol].indexOf(enemyColor) !== -1) {
        const diagonal = moveCol < col ? -1 : 1;

        if (
          isCoordValid(`${+moveRow + direction}/${+moveCol + diagonal}`) &&
          board[+moveRow + direction][+moveCol + diagonal] === "-"
        ) {
          // possibleCapturedPieces.push(`${moveRow}/${moveCol}`);
          possibleCapturedPieces[
            `${+moveRow + direction}/${+moveCol + diagonal}`
          ] = `${moveRow}/${moveCol}`;

          possibleCaptures.push(
            `${+moveRow + direction}/${+moveCol + diagonal}`
          );
        }
      }
    });
  };

  const [row, col] = id.split("/");
  calcMoves(row, col);

  //Find multiple captures
  possibleCaptures.forEach((move) => {
    const [row, col] = move.split("/");
    calcMoves(row, col, true);
  });

  const moves = [...possibleMoves, ...possibleCaptures];

  return {
    moves: [...possibleMoves, ...possibleCaptures],
    captures: Object.values(possibleCapturedPieces),
  };
};
