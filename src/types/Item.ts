export interface Item {
  id: number;
  text: string;
}

export interface DragItem {
  id: number;
  text: string;
  currentColumnName: string;
}

// Note: Allowed drag&drop items
export enum DNDTargetItems {
  TASK = "task",
}
