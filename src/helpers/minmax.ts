import * as game from "./gameLogic";

interface IMoves {
  [key: string]: number;
}

const findPiecesLeft = (board: string[][], piece: string) => {
  return board.flat().filter((square) => square === piece).length;
};

const simulateMove = (
  id: string,
  move: string,
  captures: string[] | undefined,
  board: string[][]
) => {
  const [row, col] = id.split("/");
  const [moveRow, moveCol] = move.split("/");

  //Move a piece
  const boardAfterMove = board.map((arr) => arr.slice());
  boardAfterMove[+moveRow][+moveCol] = board[+row][+col];
  boardAfterMove[+row][+col] = "-";

  //Remove captured
  if (captures) {
    captures.forEach((capture) => {
      const [captureRow, captureCol] = capture.split("/");
      boardAfterMove[+captureRow][+captureCol] = "-";
    });
  }

  //Check promotions
  const boardWithPromotions = game.checkPromotions(boardAfterMove);

  return boardWithPromotions;
};

const evaluation = (board: string[][]) => {
  let score = 0;
  score =
    findPiecesLeft(board, "bp") -
    findPiecesLeft(board, "rp") +
    (findPiecesLeft(board, "bk") - findPiecesLeft(board, "rk")) * 2;

  if (game.checkIfWinner("black", board)) score += 50;
  if (game.checkIfWinner("red", board)) score -= 50;

  return score;
};

const getAllMoves = (board: string[][], color: string) => {
  const moves: string[][][] = [];
  const colorShort = color === "red" ? "r" : "b";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (!board[row][col].includes(colorShort)) continue;

      const id = game.calcId(row, col);
      const isKing = game.isIdKing(id, board);
      const { possibleMoves, possibleCaptures } = game.findMoves(
        id,
        color,
        board,
        isKing
      );

      possibleMoves.forEach((move) => {
        const newBoard = simulateMove(id, move, possibleCaptures[move], board);
        moves.push(newBoard);
      });
    }
  }

  return moves;
};

const minimax = (position: string[][], depth: number, maxPlayer: boolean) => {
  if (
    depth === 0 ||
    game.checkIfWinner("black", position) ||
    game.checkIfWinner("red", position)
  )
    return {
      evaluation: evaluation(position),
      position,
    };

  if (maxPlayer) {
    let maxEval = -Infinity;
    let bestMove;
    const moves = getAllMoves(position, "black");
    moves.forEach((move) => {
      const { evaluation } = minimax(move, depth - 1, false);
      maxEval = Math.max(maxEval, evaluation);
      if (maxEval === evaluation) bestMove = move;
    });
    return { evaluation: maxEval, position: bestMove };
  } else {
    let minEval = Infinity;
    let bestMove;
    const moves = getAllMoves(position, "red");
    moves.forEach((move) => {
      const { evaluation } = minimax(move, depth - 1, true);
      minEval = Math.min(minEval, evaluation);
      if (minEval === evaluation) bestMove = move;
    });
    return { evaluation: minEval, position: bestMove };
  }
};

export default minimax;
// const calcScore = (
//   board: string[][],
//   player: string,
//   pieceId: string,
//   move: string,
//   captures: string[],
//   depth: number
// ) => {
//   const playerColor = player === "black" ? "b" : "r";
//   const enemyColor = player === "black" ? "r" : "b";

//   let score = 0;

//   //Simulate move
//   const tempBoard = simulateMove(pieceId, move, captures, board);

//   //Check winner after move
//   const isWinner = game.checkIfWinner(player, tempBoard);

//   if (isWinner && player === "black") score += 100 - depth;
//   if (isWinner && player === "red") score += depth - 100;

//   //Score for promotion
//   const wasPromotion =
//     tempBoard.flat().filter((square) => square.includes(playerColor + "k"))
//       .length >
//     board.flat().filter((square) => square.includes(playerColor + "k")).length;

//   if (wasPromotion && player === "black") score += 15 - depth;
//   if (wasPromotion && player === "red") score += depth - 15;

//   //Score for capturing king
//   const capturedKings =
//     board.flat().filter((square) => square.includes(enemyColor + "k")).length -
//     tempBoard.flat().filter((square) => square.includes(enemyColor + "k"))
//       .length;

//   if (player === "black") score += capturedKings * (25 - depth);
//   if (player === "red") score += capturedKings * (depth - 25);

//   //Score for capturing pawn
//   const capturedPawns =
//     board.flat().filter((square) => square.includes(enemyColor + "p")).length -
//     tempBoard.flat().filter((square) => square.includes(enemyColor + "p"))
//       .length;

//   if (player === "black") score += capturedPawns * (10 - depth);
//   if (player === "red") score += capturedPawns * (depth - 10);

//   return {
//     score,
//     tempBoard,
//   };
// };

// const minimax = (board: string[][], depth: number, maximizingPlayer: boolean) => {
//     if (depth === 0) return

// };

// const aiMove = (board: string[][]) => {
//   //   const moves: IMoves = {}; -> punkty dla wszystkich dostepnych ruchow

//   for (let boardRow = 0; boardRow < 8; boardRow++) {
//     for (let boardCol = 0; boardCol < 8; boardCol++) {
//       if (!board[boardRow][boardCol].includes("black")) continue;

//       const pieceId = game.calcId(boardRow, boardCol);
//       const isKing = game.isIdKing(pieceId, board);

//       const { possibleMoves, possibleCaptures } = game.findMoves(
//         pieceId,
//         "black",
//         board,
//         isKing
//       );

//       if (possibleMoves.length === 0) continue

//       possibleMoves.forEach(move => {
//           //minmax()
//       })
//     }
//   }
// };

// export default aiMove;

// const minmax: any = (board: string[][], player: string, depth: number) => {
//   const playerColor = player === "black" ? "b" : "r";
//   const enemyColor = player === "black" ? "r" : "b";

//   if (depth > 3) return;

//   for (let boardRow = 0; boardRow < 8; boardRow++) {
//     for (let boardCol = 0; boardCol < 8; boardCol++) {
//       if (!board[boardRow][boardCol].includes(playerColor)) continue;

//       const pieceId = game.calcId(boardRow, boardCol);
//       const isKing = game.isIdKing(pieceId, board);

//       const { possibleMoves, possibleCaptures } = game.findMoves(
//         pieceId,
//         player,
//         board,
//         isKing
//       );

//       if (possibleMoves.length === 0) continue;

//       for (let i = 0; i < possibleMoves.length; i++) {

//       }
//     }
//   }
// };
