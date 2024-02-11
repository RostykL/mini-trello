import { useCallback, useState } from "react";
import CardStack from "src/components/CardStack";
import { DragItem, Item } from "src/types/Item.ts";
import { CARDS } from "src/constants/cards.ts";
import { calculateIndex } from "src/shared/board/calculateIndex.ts";

const Board = () => {
  const [cards, setCards] = useState<Record<string, Item[]>>(CARDS);

  const onCardStackDrop = (item: DragItem, moveToSection: string) => {
    // Note: don't allow to move item in the same section it was taken from
    if (
      item.currentColumnName === moveToSection ||
      cards[moveToSection].length > 0
    ) {
      return;
    }

    setCards((prevCards) => {
      // Note: remove item from the section the item was taken from
      const removeItemFromSection = prevCards[item.currentColumnName].filter(
        (currentColumnItem) => currentColumnItem.id !== item.id,
      );

      // Append item in the end to the new section and change item currentColumnName to the new one
      const droppedToSection = [...prevCards[moveToSection], item];

      return {
        ...prevCards,
        [item.currentColumnName]: removeItemFromSection,
        [moveToSection]: droppedToSection,
      };
    });
  };

  const moveCard = useCallback(
    (
      isTopPosition: boolean,
      item: DragItem,
      hoverOverItemId: number,
      moveToSection: string,
    ) => {
      const isColumnTheSame = item.currentColumnName === moveToSection;

      setCards((prevCards) => {
        // Move dragged item to the same columns
        if (isColumnTheSame) {
          const currentColumn = [...prevCards[item.currentColumnName]];
          // Remove dragged item from the column on drop
          currentColumn.splice(item.index, 1);

          // User can put item above or below hovered element. Here we calculate the index.
          const getIndexForPosition = calculateIndex(
            isTopPosition,
            currentColumn,
            hoverOverItemId,
          );

          currentColumn.splice(getIndexForPosition, 0, {
            ...item,
            index: getIndexForPosition,
          });

          return {
            ...prevCards,
            [item.currentColumnName]: currentColumn,
          };
        }

        // Move dragged item to another column

        // 1. Remove dragged item from its initial column
        const draggedItemColumn = [...prevCards[item.currentColumnName]];
        draggedItemColumn.splice(item.index, 1);

        // 2. Add new item to the new column
        const newColumn = [...prevCards[moveToSection]];

        // User can put item above or below hovered element. Here we calculate the index.
        const getIndexForPosition = calculateIndex(
          isTopPosition,
          newColumn,
          hoverOverItemId,
        );

        newColumn.splice(getIndexForPosition, 0, {
          ...item,
          index: getIndexForPosition,
        });

        // 3. Logic for adding to top or bottom should stay the same as above
        return {
          ...prevCards,
          [item.currentColumnName]: draggedItemColumn,
          [moveToSection]: newColumn,
        };
      });
    },
    [],
  );

  return (
    <main className="w-full h-full">
      <section className="p-4 w-full h-full flex overflow-x-scroll gap-4">
        {Object.entries(cards).map(([columnTitle, cards]) => {
          return (
            <CardStack
              setCards={setCards}
              columnTitle={columnTitle}
              key={columnTitle}
              listOfCards={cards}
              moveCard={moveCard}
              onCardStackDrop={onCardStackDrop}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Board;
