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
    if (item.currentColumnName === moveToSection) {
      console.log(item, moveToSection, "blocked");
      return;
    }
    console.log(item.currentColumnName, moveToSection);
    // Note: remove item from the current column
    // Append item to the new column

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
    (dragIndex: number, hoverIndex: number, section: "backlog" | "todo") => {
      setCards((tmp) => {
        // const removeDragElement = tmp[section].filter(
        //   (el, i) => i !== dragIndex,
        // );
        // const prevCards = [...tmp[section]];
        // console.log(prevCards, "prevCards");
        // if (prevCards.length === 0) return tmp;
        // const draggedCard = tmp[section][dragIndex];
        //
        // prevCards.splice(dragIndex, 1);
        // // @ts-ignore
        // prevCards.splice(hoverIndex, 0, { ...draggedCard, id });

        return {
          ...tmp,
          [section]: [],
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
              listOfCards={cards}
              columnTitle={columnTitle}
              moveCard={() => {}}
              onCardStackDrop={onCardStackDrop}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Board;
