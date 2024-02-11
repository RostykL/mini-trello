import { useDrag } from "react-dnd";
import { DNDTargetItems, DragItem } from "src/types/Item.ts";
import { useMemo } from "react";

export const useCardDrag = ({
  id,
  currentColumnName,
  text,
  dateOfCreation,
  index,
}: DragItem) => {
  const [{ isDragging }, drag] = useDrag({
    type: DNDTargetItems.TASK,
    item: () => {
      return { id, currentColumnName, text, index, dateOfCreation };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getStyles = useMemo(() => {
    const background = isDragging
      ? "#a9acd4"
      : "rgb(55 65 81 / var(--tw-bg-opacity))";
    const textColor = isDragging ? "#a9acd4" : "white";
    const outline = isDragging ? "2px dashed coral" : "";
    return { background, color: textColor, outline };
  }, [isDragging]);

  return useMemo(
    () => [getStyles, { isDragging }, drag] as const,
    [drag, getStyles, isDragging],
  );
};
