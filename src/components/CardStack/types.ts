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
  setCards: React.Dispatch<React.SetStateAction<Record<string, Item[]>>>;
  onCardStackDrop: (item: DragItem, moveToSection: string) => void;
}
