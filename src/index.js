const gameState = {
  onBoard: {},
  onHand: {},
  possibleMoves: {
    "0-0": { left: 0, right: 0 },
    "0-1": { left: 0, right: 1 },
    "0-2": { left: 0, right: 2 },
    "0-3": { left: 0, right: 3 },
    "0-4": { left: 0, right: 4 },
    "0-5": { left: 0, right: 5 },
    "0-6": { left: 0, right: 6 },
    "1-1": { left: 1, right: 1 },
    "1-2": { left: 1, right: 2 },
    "1-3": { left: 1, right: 3 },
    "1-4": { left: 1, right: 4 },
    "1-5": { left: 1, right: 5 },
    "1-6": { left: 1, right: 6 },
    "2-2": { left: 2, right: 2 },
    "2-3": { left: 2, right: 3 },
    "2-4": { left: 2, right: 4 },
    "2-5": { left: 2, right: 5 },
    "2-6": { left: 2, right: 6 },
    "3-3": { left: 3, right: 3 },
    "3-4": { left: 3, right: 4 },
    "3-5": { left: 3, right: 5 },
    "3-6": { left: 3, right: 6 },
    "4-4": { left: 4, right: 4 },
    "4-5": { left: 4, right: 5 },
    "4-6": { left: 4, right: 6 },
    "5-5": { left: 5, right: 5 },
    "5-6": { left: 5, right: 6 },
    "6-6": { left: 6, right: 6 },
  },
};

const root = document.getElementById("root");

const possibleMovesDiv = document.createElement("div");
possibleMovesDiv.id = "possibleMoves";

const onBoardDiv = document.createElement("div");
onBoardDiv.id = "onBoard";

const onHandDiv = document.createElement("div");
onHandDiv.id = "onHand";

let counter = 0;

const createTile = (parsedArray, area) => {
  area.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const title = document.createElement("h2");
  title.innerText = area.id;
  fragment.appendChild(title);

  Object.entries(parsedArray).forEach(([key, tile]) => {
    const tileDiv = document.createElement("div");
    tileDiv.classList.add("tile");
    tileDiv.id = key;

    tileDiv.addEventListener("click", () => {
      moveTile(key, tile);
    });

    const left = document.createElement("div");
    left.classList.add("left");
    left.innerText = tile.left;
    const right = document.createElement("div");
    right.classList.add("right");
    right.innerText = tile.right;
    tileDiv.appendChild(left);
    tileDiv.appendChild(right);

    fragment.appendChild(tileDiv);
  });

  area.appendChild(fragment);
};

const moveTile = (key, tile) => {
  if (counter < 7) {
    gameState.onHand[key] = tile;
  } else {
    gameState.onBoard[key] = tile;
    delete gameState.onHand[key];
  }

  delete gameState.possibleMoves[key];
  counter++;

  updateTiles();
};

const updateTiles = () => {
  createTile(gameState.possibleMoves, possibleMovesDiv);
  createTile(gameState.onHand, onHandDiv);
  createTile(gameState.onBoard, onBoardDiv);

  hideEmptySets();
};

const hideEmptySets = () => {
  possibleMovesDiv.style.display = isEmpty(gameState.possibleMoves)
    ? "none"
    : "flex";
  onHand.style.display = isEmpty(gameState.onHand) ? "none" : "flex";
  onBoard.style.display = isEmpty(gameState.onBoard) ? "none" : "flex";
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

(() => {
  createTile(gameState.possibleMoves, possibleMovesDiv);
  root.appendChild(possibleMovesDiv);
  root.appendChild(onBoardDiv);
  root.appendChild(onHandDiv);
})();
