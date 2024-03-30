export interface CellCoords {
  i: number;
  j: number;
}

export interface CellStyle {
  base: string;
  dynamic: string;
}

export interface Cell {
  element: Element;
  coords: CellCoords;
  style: CellStyle;
}

export interface NextMoves {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
}
