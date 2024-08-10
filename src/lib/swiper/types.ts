export type Swiper = {
  element: Element | null;
  cells: Cell[];
  nextMoves: NextMoves;
};

export type Cell = {
  element: Element;
  coords: CellCoords;
  style: CellStyle;
};

export type CellCoords = {
  i: number;
  j: number;
};

export type CellStyle = {
  base: string;
  dynamic: string;
};

export type NextMoves = {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
};
