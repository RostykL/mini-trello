const Sidebar = () => {
  return (
    <aside className="bg-green-100 py-8 px-4 font-light">
      <h1 className="text-2xl uppercase mb-6">Choose Board</h1>
      <ul className="flex flex-col gap-4 py-4 text-white">
        <li className="bg-gray-700 hover:bg-opacity-85 rounded px-4 py-2 uppercase">
          Board 1
        </li>
        <li className="bg-gray-700 hover:bg-opacity-85 rounded px-4 py-2 uppercase">
          Board 2
        </li>
        <li className="bg-gray-700 hover:bg-opacity-85 rounded px-4 py-2 uppercase">
          Board 3
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
