let possibleMoves = {
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
};

let dominoesInHands = {};
let dominoesOnBoard = {};

let counter = 0;

let root = document.getElementById("root");

let onBoard = document.createElement("div");
onBoard.id = "onBoard";
let onHand = document.createElement("div");
onHand.id = "onHand";
let possibleMovesDiv = document.createElement("div");
possibleMovesDiv.id = "possibleMoves";



function createTile(parsedArray, area) {
  area.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let title = document.createElement("h2");
  title.innerText = area.id;
  fragment.appendChild(title);
  Object.entries(parsedArray).forEach(([key, tile]) => {
    let tileDiv = document.createElement("div");
    tileDiv.classList.add("tile");
    tileDiv.id = key;

    tileDiv.addEventListener("click", () => {
      moveTile(key, tile);
    });

    let left = document.createElement("div");
    left.classList.add("left");
    left.innerText = tile.left;
    let right = document.createElement("div");
    right.classList.add("right");
    right.innerText = tile.right;
    tileDiv.appendChild(left);
    tileDiv.appendChild(right);

    fragment.appendChild(tileDiv);
  });

  area.appendChild(fragment);
}

function moveTile(key, tile) {
  if (counter < 7) {
    dominoesInHands[key] = tile;
  } else {
    dominoesOnBoard[key] = tile;
    delete dominoesInHands[key];
  }

  delete possibleMoves[key];
  counter++;

  updateTiles();
}

function updateTiles() {
  createTile(possibleMoves, possibleMovesDiv);
  createTile(dominoesInHands, onHand);
  createTile(dominoesOnBoard, onBoard);

  hideEmptySets();
}

function hideEmptySets() {
  possibleMovesDiv.style.display = isEmpty(possibleMoves) ? "none" : "flex";
  onHand.style.display = isEmpty(dominoesInHands) ? "none" : "flex";
  onBoard.style.display = isEmpty(dominoesOnBoard) ? "none" : "flex";
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

(() => {
  createTile(possibleMoves, possibleMovesDiv);
  root.appendChild(possibleMovesDiv);
  root.appendChild(onBoard);
  root.appendChild(onHand);
})();
