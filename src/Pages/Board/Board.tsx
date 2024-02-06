import { useCallback, useState } from "react";
import Card from "src/components/Card";

const Board = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Write a cool JS library",
    },
    {
      id: 2,
      text: "Make it generic enough",
    },
    {
      id: 3,
      text: "Write README",
    },
    {
      id: 4,
      text: "Create some examples",
    },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
    },
    {
      id: 6,
      text: "???",
    },
    {
      id: 7,
      text: "PROFIT",
    },
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((tmp) => {
      const prevCards = [...tmp];
      const draggedCard = prevCards[dragIndex];

      prevCards.splice(dragIndex, 1);
      prevCards.splice(hoverIndex, 0, draggedCard);

      return [...prevCards];
    });
  }, []);

  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    },
    [],
  );

  return (
    <main className="w-full h-full">
      <section className="p-4 w-full h-full flex overflow-x-scroll gap-4">
        <div className="flex-[0_0_350px] h-fit bg-gray-900 p-4 rounded-2xl text-white flex flex-col gap-4 shadow-xl">
          <h1 className="font-bold tracking-wider text-gray-300 px-4">Title</h1>
          <div className="flex flex-col gap-3">
            {cards.map((card, i) => renderCard(card, i))}
          </div>
        </div>

        <div className="flex-[0_0_350px] h-fit bg-gray-900 p-4 rounded-2xl text-white flex flex-col gap-4 shadow-xl">
          <h1 className="font-bold tracking-wider text-gray-300 px-4">Title</h1>
          <div className="flex flex-col gap-3">
            {cards.map((card, i) => renderCard(card, i))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Board;
