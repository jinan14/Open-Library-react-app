import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { getCoverImage } from '../utils'; // Import the utility function

const BookCard = ({ book }) => {
    const { setSelectedBook } = useStore();
    
    // Get the cover image URL using the utility function
    const coverImage = getCoverImage(book);

    return (
        <div className="border p-4 rounded-xl shadow w-[300px] h-[600px]">
            <div className='h-[60%]'>
                {/* if the coverImage URL includes the substring 'placeholder', it means that the cover image is not available*/}
                <img className='object-cover h-full m-auto' src={coverImage} alt={`Cover of ${book.title}`} />
                {coverImage.includes('placeholder') ? <p className="text-gray-500">Cover not available</p> : null}
            </div>
            <div className='h-[40%] flex flex-col gap-3 justify-center'>
                <h2 className="text-2xl font-semibold">{book.title}</h2>
                <p>{book.author_name?.join(', ')}</p>
                <p>Published Year: {book.first_publish_year}</p>
                {/**if book.author_name is not null or undefined, it will join the elements of the array with a comma separator. */}
                <p>{book.subjects?.join(', ')}</p>
                {
                    /*
                     * .split('/') it's splitting the book.key string using the forward slash ('/')
                     * .pop() it's removing the last part of the book.key string after the last forward slash.
                     * book.key.split('/').pop() is effectively extracting the last part of the book.key
                     * This extracted part is then used as the dynamic part of the URL for the Link component.
                     */
                }
                <Link to={`/books/${book.key.split('/').pop()}`} onClick={() => setSelectedBook(book)}>
                    <button className="bg-lime-600 text-white mt-2 p-2 rounded-3xl">View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default BookCard;
