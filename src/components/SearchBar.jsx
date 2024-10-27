import React, { useState } from 'react';
import axios from 'axios';
import {useStore} from '../store';
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setBooks } = useStore();

  const handleSearch = async () => {
    if (!query) {
      console.log("No query entered");
      return; // Prevent searching if the query is empty
    }

    try {
      console.log(`Searching for: ${query}`); // Log the query
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      console.log(response.data.docs); // Log the response data
      setBooks(response.data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="mb-4 flex justify-center items-center ">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 px-4 mr-2 rounded-3xl  "
      />
      <button onClick={handleSearch} className="bg-lime-600 text-white p-2 flex items-center justify-center text-2xl font-bold rounded-full h-10 w-10">
      <IoSearch />
      </button>
    </div>
  );
};

export default SearchBar;
