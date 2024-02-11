import { CardProps } from "src/components/Card/types.ts";
import { useCardDrag } from "src/components/Card/hooks/useCardDrag.ts";
import {
  useCardBottomDrop,
  useCardDrop,
  useCardTopDrop,
} from "src/components/Card/hooks/useCardDrop.ts";

const Card = ({
  text,
  id,
  moveCard,
  currentColumnName,
  dateOfCreation,
  index,
}: CardProps) => {
  const [getStyles, , drag] = useCardDrag({
    id,
    currentColumnName,
    dateOfCreation,
    text,
    index,
  });

  const [{ isHintOver, getItem }, hintRef] = useCardDrop();

  const [{ isOverTop }, refTop] = useCardTopDrop({
    id,
    currentColumnName,
    moveCard,
  });

  const [{ isOverBottom }, refBottom] = useCardBottomDrop({
    id,
    currentColumnName,
    moveCard,
  });

  const isAllowed = getItem?.id !== id && isHintOver;

  return (
    <div
      className="flex flex-col gap-1 transition-all duration-700 py-1.5"
      ref={hintRef}
    >
      <div
        className={`transition-all ${isOverTop ? "outline-dashed py-6" : "outline-solid"} ${isAllowed ? "py-4 opacity-1 duration-[400ms]" : "py-0 opacity-0 duration-[400ms]"} bg-gray-600 outline-1 rounded-md hover:outline`}
        ref={refTop}
      />
      <div
        ref={drag}
        style={{
          ...getStyles,
          transform: "translate(0,0)",
        }}
        className="transition-all bg-gray-700 rounded-md px-4 py-2"
      >
        {text}
      </div>
      <div
        className={`transition-all ${isOverBottom ? "outline-dashed py-6" : "outline-solid"} ${isAllowed ? "py-4 opacity-1 duration-[400ms]" : "py-0 opacity-0 duration-[400ms]"} bg-gray-600 outline-1 rounded-md`}
        ref={refBottom}
      />
    </div>
  );
};

export default Card;
