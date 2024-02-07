import { DragItem, Item } from "src/types/Item.ts";

export interface CardStackProps {
  columnTitle: string;
  listOfCards: Item[];
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    currentColumnName: string,
  ) => void;
  onCardStackDrop: (item: DragItem, moveToSection: string) => void;
}
