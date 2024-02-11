import { Item } from "src/types/Item.ts";

export const calculateIndex = (
  isTopPosition: boolean,
  column: Item[],
  hoverOverItemId: number,
) => {
  // Find index of the item we hover over
  const getHoveredOverItemIndex = column.findIndex(
    (item) => item.id === hoverOverItemId,
  );

  // Calculate new index based on whether we want to put it above or below the hovered over item.
  return isTopPosition ? getHoveredOverItemIndex : getHoveredOverItemIndex + 1;
};
