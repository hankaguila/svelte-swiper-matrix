import type { Swiper } from "$lib/swiper/types";
import { moveDown, moveLeft, moveRight, moveUp } from "$lib/swiper/helpers";

export function onMouseEnter(event: Event) {
  (event.target as HTMLElement).focus();
}

export function onKeydown(event: KeyboardEvent, swiper: Swiper) {
  if (event.ctrlKey) return; // just in case

  const { key } = event;

  if (key === "ArrowUp") {
    moveUp(swiper);
  } else if (key === "ArrowRight") {
    moveRight(swiper);
  } else if (key === "ArrowDown") {
    moveDown(swiper);
  } else if (key === "ArrowLeft") {
    moveLeft(swiper);
  }
}

export function onWheel(event: WheelEvent, swiper: Swiper) {
  if (event.ctrlKey) return; // to avoid scrolling on viewport resize

  const { deltaY } = event;

  if (deltaY > 0) {
    moveDown(swiper);
  } else {
    moveUp(swiper);
  }
}

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

export function onTouchStart(event: TouchEvent) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

export function onTouchMove(event: TouchEvent) {
  touchEndX = event.touches[0].clientX;
  touchEndY = event.touches[0].clientY;
}

export function onTouchEnd(swiper: Swiper) {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // Swiped right
      moveLeft(swiper);
    } else {
      // Swiped left
      moveRight(swiper);
    }
  } else if (deltaY > 0) {
    // Swiped down
    moveUp(swiper);
  } else {
    // Swiped up
    moveDown(swiper);
  }
}
