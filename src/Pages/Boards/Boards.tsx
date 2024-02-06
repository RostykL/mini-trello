import BoardTypeSection from "src/components/BoardTypeSection";
import { NavLink } from "react-router-dom";

const Boards = () => {
  return (
    <main className="flex h-full">
      <section className="flex flex-col gap-8 p-8">
        <BoardTypeSection title="Starred boards" />
        <NavLink to="/board/2" className="bg-red-300 p-4 rounded">
          go to 2 board
        </NavLink>
      </section>
    </main>
  );
};

export default Boards;
