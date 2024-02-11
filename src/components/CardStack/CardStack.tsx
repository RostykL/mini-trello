import Card from "src/components/Card";
import { CardStackProps } from "src/components/CardStack/types.ts";
import { useState } from "react";
import { useCardStackDrop } from "src/components/CardStack/hooks/useCardStackDrop.ts";
import { orderBy as LodashOrderBy } from "lodash";

export enum SortTypes {
  ASC = "asc",
  DESC = "desc",
}

const isSortTypeAsc = (type: SortTypes) => SortTypes.ASC === type;

const CardStack = ({
  columnTitle,
  listOfCards,
  moveCard,
  onCardStackDrop,
  setCards,
}: CardStackProps) => {
  const [{ isOver, item }, drop] = useCardStackDrop({
    onDrop(item) {
      onCardStackDrop(item, columnTitle);
    },
  });

  const [orderBy, setOrderBy] = useState<SortTypes>(SortTypes.ASC);

  const canShowEditBlock =
    item?.currentColumnName !== columnTitle &&
    isOver &&
    listOfCards.length === 0;

  return (
    <div className="flex-[0_0_350px]" ref={drop}>
      <div className="w-full bg-gray-800 p-4 rounded text-white flex flex-col gap-2  shadow-xl">
        <div className="flex justify-between">
          <h1 className="font-bold tracking-wider text-gray-300 px-4 uppercase">
            {columnTitle}
          </h1>
          <div className="font-light">
            sort date
            <span
              className="text-blue-400 underline lowercase cursor-pointer"
              onClick={() => {
                setOrderBy(
                  isSortTypeAsc(orderBy) ? SortTypes.DESC : SortTypes.ASC,
                );
                setCards((prevCards) => {
                  return {
                    ...prevCards,
                    [columnTitle]: LodashOrderBy(
                      prevCards[columnTitle],
                      ["dateOfCreation"],
                      isSortTypeAsc(orderBy) ? SortTypes.DESC : SortTypes.ASC,
                    ),
                  };
                });
              }}
            >
              (current:{orderBy})
            </span>
          </div>
        </div>
        <div className="flex flex-col transition-all">
          {listOfCards.map((card, index) => (
            <Card
              key={card.id}
              dateOfCreation={card.dateOfCreation}
              index={index}
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
