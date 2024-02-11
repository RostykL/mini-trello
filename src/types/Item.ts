export interface Item {
  dateOfCreation: number;
  id: number;
  text: string;
  index?: number;
}

export interface DragItem extends Item {
  id: number;
  index: number;
  currentColumnName: string;
}

// Note: Allowed drag&drop items
export enum DNDTargetItems {
  TASK = "task",
}
