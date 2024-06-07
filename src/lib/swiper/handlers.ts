import { moveDown, moveLeft, moveRight, moveUp } from "$lib/swiper/helpers";

export function onMouseEnter(event: Event) {
  (event.target as HTMLElement).focus();
}

export function onKeydown(event: KeyboardEvent) {
  if (event.ctrlKey) return; // just in case
  const { key } = event;
  if (key === "ArrowUp") {
    moveUp();
  } else if (key === "ArrowRight") {
    moveRight();
  } else if (key === "ArrowDown") {
    moveDown();
  } else if (key === "ArrowLeft") {
    moveLeft();
  }
}

export function onWheel(event: WheelEvent) {
  if (event.ctrlKey) return; // to avoid scrolling on viewport resize
  const { deltaY } = event;
  if (deltaY > 0) {
    moveDown();
  } else {
    moveUp();
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

export function onTouchEnd() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // Swiped right
      moveLeft();
    } else {
      // Swiped left
      moveRight();
    }
  } else if (deltaY > 0) {
    // Swiped down
    moveUp();
  } else {
    // Swiped up
    moveDown();
  }
}
