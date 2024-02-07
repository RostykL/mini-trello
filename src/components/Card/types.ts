import { DragItem } from "src/types/Item.ts";

export interface CardProps extends DragItem {
  moveCard: (
    isTop: boolean,
    item: DragItem,
    id: number,
    currentColumnName: string,
  ) => void;
}
