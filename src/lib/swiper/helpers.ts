import type { CellCoords, NextMoves, Swiper } from "./types";
import { get } from "svelte/store";
import { arrowsRerenderTrigger } from "$lib/swiper/stores";

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

function areCoordsAvailable(swiper: Swiper, { i, j }: CellCoords) {
  return Boolean(
    swiper.cells.find(({ coords }) => coords.i === i && coords.j === j)
  );
}

const nextSteps = {
  up: { i: 0, j: -1 },
  right: { i: 1, j: 0 },
  down: { i: 0, j: 1 },
  left: { i: -1, j: 0 }
};

function canMove(swiper: Swiper, direction: keyof NextMoves) {
  return areCoordsAvailable(swiper, nextSteps[direction]);
}

function updateNextMoves(swiper: Swiper) {
  swiper.nextMoves.up = canMove(swiper, "up");
  swiper.nextMoves.right = canMove(swiper, "right");
  swiper.nextMoves.down = canMove(swiper, "down");
  swiper.nextMoves.left = canMove(swiper, "left");
}

export function positionChildren(swiper: Swiper, iOffset = 0, jOffset = 0) {
  for (const cell of swiper.cells) {
    cell.coords.i += iOffset;
    cell.coords.j += jOffset;
    cell.style.dynamic =
      ` left: ${cell.coords.i * 100}vw;` + ` top: ${cell.coords.j * 100}vh;`;
    cell.element.setAttribute("style", cell.style.base + cell.style.dynamic);
  }

  updateNextMoves(swiper);

  arrowsRerenderTrigger.set(!get(arrowsRerenderTrigger));
}

export function moveUp(swiper: Swiper) {
  if (canMove(swiper, "up")) {
    positionChildren(swiper, 0, 1);
  }
}

export function moveRight(swiper: Swiper) {
  if (canMove(swiper, "right")) {
    positionChildren(swiper, -1, 0);
  }
}

export function moveDown(swiper: Swiper) {
  if (canMove(swiper, "down")) {
    positionChildren(swiper, 0, -1);
  }
}

export function moveLeft(swiper: Swiper) {
  if (canMove(swiper, "left")) {
    positionChildren(swiper, 1, 0);
  }
}
