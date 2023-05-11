export type Coord = [x: number, y: number];

export interface PaperEvent {
  e: PointerEvent;
  coord: Coord;
}
