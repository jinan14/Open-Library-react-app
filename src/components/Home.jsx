import React, { useEffect } from 'react';
import { useStore } from '../store';
import axios from 'axios';
import SearchBar from './SearchBar';
import BookCard from './BookCard';

const Home = () => {
    const { books, setBooks } = useStore();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('https://openlibrary.org/subjects/love.json?limit=8');
            setBooks(response.data.works);
        };
        fetchBooks();
    }, [setBooks]);

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <div className='home flex  w-full h-[750px]'>
                <div className='picture md:w-1/2'>
                    <img className='object-cover w-full h-full' src="/home.jpeg" alt="" />
                </div>
                <div className='title flex flex-col gap-14 justify-center items-center w-full md:w-1/2 p-8'>
                    <h1 className="text-3xl md:text-5xl text-center font-bold mb-7">Whispering Books <br /> Library</h1>
                    <p className='text-lg md:text-xl text-center mb-7'>A place where the books seem to speak, sharing their stories with those who dare to listen.</p>
                    <SearchBar />
                </div>
            </div>
            <div className=" book-grid grid grid-cols-4 gap-4  w-full px-4">
                {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;
