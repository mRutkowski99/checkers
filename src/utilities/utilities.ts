export const clearActiveFields = (board: string[][]) => {
  //clear board from active field (place where piece can possibly move)

  return board.map((row) =>
    row.map((square) => (square === "a" ? "-" : square))
  );
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
  return `${Math.abs((+rowStart + +rowEnd) / 2)}/${Math.abs(
    (+colStart + +colEnd) / 2
  )}`;
};

interface ICaptures {
  [key: string]: string[];
}

export const findMoves = (
  id: string,
  color: string,
  board: string[][],
  forward: number = 1
) => {
  const possibleMoves: string[] = []; //stores coordinates of possible moves
  const possibleMovesWithCapture: string[] = [];
  const possibleCaptures: ICaptures = {};

  //Red pawn move 'up' and black pawn moves 'down'. Every row is array's element which store squares.
  //So to find move for red pawn we need to check previous element (row) and for black pawn following element (row)
  let direction = color === "red" ? -1 : 1;
  direction = direction * forward;

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
    const filteredMoves = moves.filter((move) => isIdValid(move));
    if (filteredMoves.length === 0) return;

    filteredMoves.forEach((move, i) => {
      const [moveRow, moveCol] = move.split("/");

      if (board[+moveRow][+moveCol] === "-" && !onlyCaptures)
        possibleMoves.push(move);

      if (board[+moveRow][+moveCol].indexOf(enemyColor) !== -1) {
        const diagonal = moveCol < col ? -1 : 1;

        if (
          isIdValid(`${+moveRow + direction}/${+moveCol + diagonal}`) &&
          board[+moveRow + direction][+moveCol + diagonal] === "-"
        ) {
          possibleMovesWithCapture.push(
            `${+moveRow + direction}/${+moveCol + diagonal}`
          );
        }
      }
    });
  };

  const findCaptures = (
    row: string,
    col: string,
    moves: string[],
    board: string[][]
  ) => {
    moves.forEach((move) => {
      const [moveRow, moveCol] = move.split("/");

      //Single capture
      if (Math.abs(+row - +moveRow) === 2) {
        possibleCaptures[move] = [calcCapturedId(row, col, moveRow, moveCol)];
      }

      //Double capture
      if (Math.abs(+row - +moveRow) === 4) {
        const possiblePrevCaptures = [
          [+moveRow - 2 * direction, +moveCol - 2],
          [+moveRow - 2 * direction, +moveCol + 2],
        ];

        const filteredPrevCap = possiblePrevCaptures.filter(
          (capture) =>
            isIdValid(`${capture[0]}/${capture[1]}`) &&
            board[capture[0]][capture[1]] === "-"
        );

        filteredPrevCap.forEach((prevCapture) => {
          const possibleCapturedPiece = calcCapturedId(
            String(prevCapture[0]),
            String(prevCapture[1]),
            moveRow,
            moveCol
          );
          const [capturedRow, capturedCol] = possibleCapturedPiece.split("/");

          if (board[+capturedRow][+capturedCol].indexOf(enemyColor) !== -1) {
            possibleCaptures[move] = [
              calcCapturedId(
                row,
                col,
                String(prevCapture[0]),
                String(prevCapture[1])
              ),
              `${capturedRow}/${capturedCol}`,
            ];
          }
        });
      }
    });
  };

  const [row, col] = id.split("/");
  calcMoves(row, col);

  //Find multiple captures
  for (let i = 0; i < 2; i++) {
    possibleMovesWithCapture.forEach((move) => {
      const [row, col] = move.split("/");
      calcMoves(row, col, true);
    });
  }

  const allPossibleMoves = [...possibleMoves, ...possibleMovesWithCapture];

  findCaptures(row, col, allPossibleMoves, board);

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
    !enemyIds.some((id) => {
      if (!isIdKing(id, board))
        return findMoves(id, enemyColor, board).possibleMoves.length > 0;
      else
        return (
          findMoves(id, enemyColor, board).possibleMoves.length > 0 &&
          findMoves(id, enemyColor, board, -1).possibleMoves.length > 0
        );
    })
  ) {
    return currentPlayer;
  }

  return "";
};
