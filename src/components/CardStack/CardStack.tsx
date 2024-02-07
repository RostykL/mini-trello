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

  console.log(item, "items");

  const canShowEditBlock = item?.currentColumnName !== columnTitle && isOver;

  return (
    <div className="flex-[0_0_350px]" ref={drop}>
      <div className="w-full bg-gray-900 p-4 rounded-2xl text-white flex flex-col gap-4 shadow-xl">
        <h1 className="font-bold tracking-wider text-gray-300 px-4">
          {columnTitle}
        </h1>
        <div className="flex flex-col gap-3">
          {listOfCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              currentColumnName={columnTitle}
              moveCard={moveCard}
              showPreview={(() => {}) as any}
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