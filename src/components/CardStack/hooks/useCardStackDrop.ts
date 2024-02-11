import { useDrop } from "react-dnd";
import { DNDTargetItems, DragItem } from "src/types/Item.ts";
import { useMemo } from "react";

export const useCardStackDrop = ({
  onDrop,
}: {
  onDrop: (item: DragItem) => void;
}) => {
  const [{ isOver, item }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; item: DragItem }
  >({
    accept: DNDTargetItems.TASK,
    drop: onDrop,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
        item: monitor.getItem(),
      };
    },
  });

  return useMemo(() => [{ isOver, item }, drop] as const, [drop, isOver, item]);
};
