import type { CellCoords } from "./types";
import { get } from "svelte/store";
import {
  cells,
  arrowsRerenderTrigger,
  nextMoves,
  updateNextMove
} from "$lib/swiper/stores";

export function parseDim(dim: string) {
  const [jMax, iMax] = dim.split("x").map((s) => Number.parseInt(s));
  if (!(Number.isInteger(jMax) && jMax > 0)) {
    throw new Error("jMax must be a non-zero positive integer");
  }
  if (!(Number.isInteger(iMax) && iMax > 0)) {
    throw new Error("iMax must be a non-zero positive integer");
  }
  return { jMax, iMax };
}

export function getAllCoords(iMax: number, jMax: number, omit: number[] = []) {
  const size = iMax * jMax;
  if (!omit.every((num) => num >= 1 && num <= size)) {
    throw new Error("One or more omit[] items out of bounds");
  }
  const coords: CellCoords[] = [];
  let step = 0;
  for (let j = 0; j < jMax; j++) {
    for (let i = 0; i < iMax; i++) {
      step += 1;
      if (omit.includes(step)) {
        continue;
      }
      coords.push({ i, j });
    }
  }
  return coords;
}

function areCoordsAvailable({ i, j }: CellCoords) {
  return Boolean(
    get(cells).find(({ coords }) => coords.i === i && coords.j === j)
  );
}

function canMoveUp() {
  updateNextMove("up", areCoordsAvailable({ i: 0, j: -1 }));
  return get(nextMoves).up;
}

function canMoveRight() {
  updateNextMove("right", areCoordsAvailable({ i: 1, j: 0 }));
  return get(nextMoves).right;
}

function canMoveDown() {
  updateNextMove("down", areCoordsAvailable({ i: 0, j: 1 }));
  return get(nextMoves).down;
}

function canMoveLeft() {
  updateNextMove("left", areCoordsAvailable({ i: -1, j: 0 }));
  return get(nextMoves).left;
}

function updateNextMoves() {
  canMoveUp();
  canMoveRight();
  canMoveDown();
  canMoveLeft();
}

export function positionChildren(iOffset = 0, jOffset = 0) {
  for (const cell of get(cells)) {
    cell.coords.i += iOffset;
    cell.coords.j += jOffset;
    cell.style.dynamic =
      ` left: ${cell.coords.i * 100}vw;` + ` top: ${cell.coords.j * 100}vh;`;
    cell.element.setAttribute("style", cell.style.base + cell.style.dynamic);
  }
  updateNextMoves();
  arrowsRerenderTrigger.set(!get(arrowsRerenderTrigger));
}

export function resetPosition() {
  for (const cell of get(cells)) {
    cell.style.dynamic = "";
    cell.element.setAttribute("style", cell.style.base);
  }
}

export function moveUp() {
  if (!canMoveUp()) {
    return;
  }
  positionChildren(0, 1);
}

export function moveRight() {
  if (!canMoveRight()) {
    return;
  }
  positionChildren(-1, 0);
}

export function moveDown() {
  if (!canMoveDown()) {
    return;
  }
  positionChildren(0, -1);
}

export function moveLeft() {
  if (!canMoveLeft()) {
    return;
  }
  positionChildren(1, 0);
}
