import { DragItem, Item } from "src/types/Item.ts";

export interface CardStackProps {
  columnTitle: string;
  listOfCards: Item[];
  moveCard: (
    isTop: boolean,
    item: DragItem,
    id: number,
    currentColumnName: string,
  ) => void;
  onCardStackDrop: (item: DragItem, moveToSection: string) => void;
}
