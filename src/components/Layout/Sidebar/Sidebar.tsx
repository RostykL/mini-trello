const Sidebar = () => {
  return (
    <aside className="bg-gray-600 py-8 px-8">
      <h1 className="text-2xl uppercase mb-3">Choose Board</h1>
      <ul className="flex flex-col gap-4 py-4 text-white w-full min-w-[250px] max-w-[250px] font-light">
        <li className="bg-gray-700 hover:bg-opacity-85 rounded-sm px-4 py-2 uppercase">
          Board 1
        </li>
        <li className="bg-gray-700 hover:bg-opacity-85 rounded-sm px-4 py-2 uppercase">
          Board 2
        </li>
        <li className="bg-gray-700 hover:bg-opacity-85 rounded-sm px-4 py-2 uppercase">
          Board 3
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
