import { useDrop } from "react-dnd";
import { DNDTargetItems, DragItem } from "src/types/Item.ts";
import { useMemo } from "react";
import { CardProps } from "src/components/Card/types.ts";

export const useCardDrop = () => {
  const [{ isHintOver, getItem }, hintRef] = useDrop<
    DragItem,
    void,
    { getItem: DragItem; isHintOver: boolean }
  >({
    accept: DNDTargetItems.TASK,
    collect(monitor) {
      return {
        getItem: monitor.getItem(),
        isHintOver: monitor.isOver(),
      };
    },
  });

  return useMemo(
    () => [{ isHintOver, getItem }, hintRef] as const,
    [getItem, hintRef, isHintOver],
  );
};

export const useCardTopDrop = ({
  id,
  currentColumnName,
  moveCard,
}: Pick<CardProps, "moveCard" | "id" | "currentColumnName">) => {
  const [{ isOverTop }, refTop] = useDrop<
    DragItem,
    void,
    { isOverTop: boolean }
  >({
    accept: DNDTargetItems.TASK,
    collect(monitor) {
      return {
        isOverTop: monitor.isOver(),
      };
    },
    drop(item) {
      if (item.id === id) {
        return;
      }
      moveCard(true, item, id, currentColumnName);
    },
  });

  return useMemo(() => [{ isOverTop }, refTop] as const, [isOverTop, refTop]);
};

export const useCardBottomDrop = ({
  id,
  currentColumnName,
  moveCard,
}: Pick<CardProps, "moveCard" | "id" | "currentColumnName">) => {
  const [{ isOverBottom }, refBottom] = useDrop<
    DragItem,
    void,
    { isOverBottom: boolean; didDropBottom: boolean }
  >({
    accept: DNDTargetItems.TASK,
    collect(monitor) {
      return {
        isOverBottom: monitor.isOver(),
        didDropBottom: monitor.didDrop(),
      };
    },
    drop(item) {
      if (item.id === id) {
        return;
      }
      moveCard(false, item, id, currentColumnName);
    },
  });

  return useMemo(
    () => [{ isOverBottom }, refBottom] as const,
    [isOverBottom, refBottom],
  );
};
