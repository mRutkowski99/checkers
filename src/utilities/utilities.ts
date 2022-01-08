export const clearActiveFields = (board: string[][]) => {
  //clear board from active field (place where piece can possibly move)
  return board.map((row) =>
    row.map((square) => (square === "a" ? "-" : square))
  );
};

const calcId = (row: number, col: number) => {
  return [row, col].join("/");
};

const isIdValid = (id: string) => {
  const [row, col] = id.split("/");
  if (+row < 0 || +row > 7) return false;
  if (+col < 0 || +col > 7) return false;
  return true;
};

const isIdKing = (id: string, board: string[][]) => {
  const [row, col] = id.split("/");
  if (board[+row][+col].indexOf("k") !== -1) return true;
  else return false;
};

const calcCapturedId = (
  rowStart: string,
  colStart: string,
  rowEnd: string,
  colEnd: string
) => {
  return calcId(
    Math.abs((+rowStart + +rowEnd) / 2),
    Math.abs((+colStart + +colEnd) / 2)
  );
};

interface ICaptures {
  [key: string]: string[];
}

export const findMoves = (
  id: string,
  color: string,
  board: string[][],
  isKing: boolean
) => {
  const possibleMoves: string[] = []; //stores coordinates of possible moves
  const possibleCaptures: ICaptures = {};

  //Red pawn move 'up' and black pawn moves 'down'. Every row is array's element which store squares.
  //So to find move for red pawn we need to check previous element (row) and for black pawn following element (row)
  const direction = color === "red" ? -1 : 1;

  const enemyColor = color === "red" ? "b" : "r";

  const calcMoves = (row: string, col: string) => {
    //Pawns can only move on diagonals so the possible moves are squares on the left and right in the previous/following row
    const moves = [
      calcId(+row + direction, +col - 1),
      calcId(+row + direction, +col + 1),
    ];

    if (isKing) {
      moves.push(calcId(+row - direction, +col - 1));
      moves.push(calcId(+row - direction, +col - 1));
    }

    //Filtering ids which are beyond board
    const filteredMoves = moves.filter((move) => isIdValid(move));
    if (filteredMoves.length === 0) return;

    filteredMoves.forEach((move) => {
      const [moveRow, moveCol] = move.split("/");
      if (board[+moveRow][+moveCol] === "-") possibleMoves.push(move);
    });
  };

  const calcCaptures = (
    row: number,
    col: number,
    board: string[][],
    isKing: boolean,
    previousCaptures: string[] = []
  ) => {
    const moves = [
      [+row + 2 * direction, +col + 2],
      [+row + 2 * direction, +col - 2],
    ];

    if (isKing) {
      moves.push([+row - 2 * direction, +col + 2]);
      moves.push([+row - 2 * direction, +col + 2]);
    }

    const validMoves = moves.filter((move) =>
      isIdValid(calcId(move[0], move[1]))
    );

    const legalMoves = validMoves.filter(
      (move) => board[move[0]][move[1]] === "-"
    );

    if (legalMoves.length === 0) return;

    legalMoves.forEach((move) => {
      const capturedId = calcCapturedId(
        String(row),
        String(col),
        String(move[0]),
        String(move[1])
      );

      if (board[+capturedId[0]][+capturedId[2]].indexOf(enemyColor) !== -1) {
        possibleCaptures[calcId(move[0], move[1])] = [
          capturedId,
          ...previousCaptures,
        ];
        return calcCaptures(
          move[0],
          move[1],
          board,
          isKing,
          possibleCaptures[calcId(move[0], move[1])]
        );
      } else return;
    });
  };

  const [row, col] = id.split("/");
  calcMoves(row, col);
  calcCaptures(+row, +col, board, isKing);

  const allPossibleMoves = [...possibleMoves, ...Object.keys(possibleCaptures)];

  console.log(possibleCaptures);

  return {
    possibleMoves: allPossibleMoves,
    possibleCaptures,
  };
};

export const checkPromotes = (board: string[][]) => {
  return board.map((row, rowIndex) => {
    return row.map((square) => {
      if (rowIndex === 0 && square === "rp") return "rk";
      else if (rowIndex === 7 && square === "bp") return "bk";
      else return square;
    });
  });
};

export const checkWinner = (currentPlayer: string, board: string[][]) => {
  const enemyColor = currentPlayer === "red" ? "black" : "red";
  const enemyColorShort = currentPlayer === "red" ? "b" : "r";

  //Enemy has no more pieces
  if (!board.flat().some((square) => square.indexOf(enemyColorShort) !== -1))
    return currentPlayer;

  //Enemy has no more moves
  const enemyIds = board
    .map((row, rowIndex) => {
      return row.reduce((ids: string[], square, colIndex) => {
        if (square.indexOf(enemyColorShort) !== -1) {
          ids.push(`${rowIndex}/${colIndex}`);
        }
        return ids;
      }, []);
    })
    .flat();

  if (
    !enemyIds.some(
      (id) =>
        findMoves(id, enemyColor, board, isIdKing(id, board)).possibleMoves
          .length > 0
    )
  ) {
    return currentPlayer;
  }

  return "";
};
