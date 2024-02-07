import { DragItem } from "src/types/Item.ts";

export interface CardProps extends DragItem {
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    currentColumnName: string,
  ) => void;
  showPreview: () => void;
}
