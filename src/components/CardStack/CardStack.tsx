import { useDrop } from "react-dnd";
import Card from "src/components/Card";
import { DNDTargetItems, DragItem } from "src/types/Item.ts";
import { CardStackProps } from "src/components/CardStack/types.ts";

const CardStack = ({
  columnTitle,
  listOfCards,
  moveCard,
  onCardStackDrop,
}: CardStackProps) => {
  const [{ isOver, item }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; item: DragItem }
  >({
    accept: DNDTargetItems.TASK,
    drop(item) {
      onCardStackDrop(item, columnTitle);
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
        item: monitor.getItem(),
      };
    },
  });

  const canShowEditBlock =
    item?.currentColumnName !== columnTitle &&
    isOver &&
    listOfCards.length === 0;

  return (
    <div className="flex-[0_0_350px]" ref={drop}>
      <div className="w-full bg-gray-800 p-4 rounded text-white flex flex-col gap-2  shadow-xl">
        <h1 className="font-bold tracking-wider text-gray-300 px-4 uppercase">
          {columnTitle}
        </h1>
        <div className="flex flex-col transition-all">
          {listOfCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              currentColumnName={columnTitle}
              moveCard={moveCard}
            />
          ))}
          {canShowEditBlock ? (
            <div
              style={{
                backgroundColor: canShowEditBlock
                  ? "rgb(55 65 81 / var(--tw-bg-opacity))"
                  : "initial",
              }}
              className="transition-all bg-gray-700 rounded-md px-4 py-10"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
