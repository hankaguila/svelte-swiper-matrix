import type { Cell, NextMoves } from "$lib/swiper/types";
import { writable } from "svelte/store";

export const matrix = writable<Element>();

export const children = writable<Element[]>([]);

export const cells = writable<Cell[]>([]);

export const nextMoves = writable<NextMoves>({
  up: false,
  right: false,
  down: false,
  left: false
});

export function updateNextMove(key: keyof NextMoves, value: boolean) {
  nextMoves.update((store) => ({ ...store, [key]: value }));
}

export const arrowsRerenderTrigger = writable(false);
