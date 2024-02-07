import { useCallback, useEffect, useState } from "react";
import CardStack from "src/components/CardStack";
import { DragItem, Item } from "src/types/Item.ts";
import { CARDS } from "src/constants/cards.ts";

const Board = () => {
  const [cards, setCards] = useState<Record<string, Item[]>>(CARDS);

  // Delete from the current column
  // Insert element on drop

  useEffect(() => {
    console.log(cards, "cards");
  }, [cards]);

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
    (isTop: boolean, item: DragItem, id: number, moveToSection: string) => {
      // console.log(isTop, item, id, moveToSection);
      setCards((prevCards) => {
        const findHoverOverItem = prevCards[moveToSection].findIndex(
          (item) => item.id === id,
        );

        const sliceTillThisIndex = isTop
          ? findHoverOverItem
          : findHoverOverItem + 1;

        if (Number.isNaN(findHoverOverItem)) {
          return prevCards;
        }

        const removeItem = prevCards[moveToSection].filter(
          (el) => el.id !== item.id,
        );
        const start = removeItem.slice(0, sliceTillThisIndex);
        const elementToInsert = item;
        const end = removeItem.slice(sliceTillThisIndex);
        const newArr = [...start, elementToInsert, ...end];
        //   return prevCards;

        return { ...prevCards, [moveToSection]: newArr };
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
              listOfCards={cards}
              columnTitle={columnTitle}
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
