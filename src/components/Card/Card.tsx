import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";

interface CardProps {
  id: number;
  index: number;
  text: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Card = ({ text, index, id, moveCard }: CardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const background = isDragging
    ? "#a9acd4"
    : "rgb(55 65 81 / var(--tw-bg-opacity))";
  const textColor = isDragging ? "#a9acd4" : "white";
  const border = isDragging ? "2px dashed lightgreen" : "";

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ background, color: textColor, border }}
      data-handler-id={handlerId}
      className="transition-all bg-gray-700 rounded-md px-4 py-2"
    >
      {text}
    </div>
  );
};

export default Card;
