// eslint-disable-next-line no-unused-vars
import React from "react";
import { IoSearchSharp } from "react-icons/io5";



function SearchInput({onSearch}) {
  const handleSearch = (ev) => {
    const searchTerm = ev.target.value;
    onSearch(searchTerm);
  }
  return (
    <div className="flex justify-center items-center gap-4 outline-none bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600">
      <input
        // value={client.first_name}
        onChange={handleSearch}
        placeholder="Search..."
        className="outline-none"
      />
      <IoSearchSharp className="text-gray-500 w-6 h-6"/>
    </div>
  );
}

export default SearchInput;
