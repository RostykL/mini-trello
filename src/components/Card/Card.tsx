import { useDrag, useDrop } from "react-dnd";
import { DNDTargetItems, DragItem } from "src/types/Item.ts";
import { CardProps } from "src/components/Card/types.ts";

const Card = ({ text, id, moveCard, currentColumnName }: CardProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: DNDTargetItems.TASK,
    item: () => {
      return { id, currentColumnName, text };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const background = isDragging
    ? "#a9acd4"
    : "rgb(55 65 81 / var(--tw-bg-opacity))";
  const textColor = isDragging ? "#a9acd4" : "white";
  const border = isDragging ? "2px dashed coral" : "";

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

  const [{ isOverTop }, refTop] = useDrop<
    DragItem,
    void,
    { isOverTop: boolean; didDropTop: boolean }
  >({
    accept: DNDTargetItems.TASK,
    collect(monitor) {
      return {
        isOverTop: monitor.isOver(),
        didDropTop: monitor.isOver(),
      };
    },
    drop(item) {
      if (item.id === id) {
        return;
      }
      moveCard(true, item, id, currentColumnName);
    },
  });

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

  const isAllowed = getItem?.id !== id && isHintOver;

  return (
    <div
      className="flex flex-col gap-1 transition-all duration-700 py-1.5"
      ref={hintRef}
    >
      <div
        className={`transition-all ${isOverTop ? "outline-dashed" : "outline-solid"} ${isAllowed ? "py-4 opacity-1 duration-[400ms]" : "py-0 opacity-0 duration-[400ms]"} bg-gray-600 outline-1 rounded-md hover:outline`}
        ref={refTop}
      />
      <div
        ref={drag}
        style={{
          background,
          color: textColor,
          outline: border,
          transform: "translate(0,0)",
        }}
        className="transition-all bg-gray-700 rounded-md px-4 py-2"
      >
        {text}
      </div>
      <div
        className={`transition-all ${isOverBottom ? "outline-dashed" : "outline-solid"} ${isAllowed ? "py-4 opacity-1 duration-[400ms]" : "py-0 opacity-0 duration-[400ms]"} bg-gray-600 outline-1 rounded-md`}
        ref={refBottom}
      />
    </div>
  );
};

export default Card;
