

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; //A hook from React Router that retrieves the parameters from the URL (in this case, the book ID).
import { useStore } from '../store';
import axios from 'axios';

const BookDetails = () => {
    //This extracts the id parameter from the URL. This id represents the unique identifier for the book you want to fetch.
    const { id } = useParams();
    const { selectedBook, setSelectedBook } = useStore();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
                console.log(response.data); // Log the response data
                setSelectedBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
            // The effect runs whenever id or setSelectedBook changes
        };

        fetchBookDetails();
    }, [id, setSelectedBook]);

    // Add a safe check before rendering
    //prevent rendering errors while the data is being fetched.
    if (!selectedBook || !selectedBook.title) {
        return <div>Loading...</div>;
    }

    // Check if cover images exist
    const coverImage = selectedBook.covers && selectedBook.covers.length > 0
        ? `https://covers.openlibrary.org/b/id/${selectedBook.covers[0]}-L.jpg`
        : null;

    return (
        <div className=" flex flex-col p-14 justify-center items-center">
            {/* If coverImage is truthy, it renders an <img>*/}
            <div className='h-[50%]'>

                {coverImage && (
                    <img className='object-cover w-full h-full mb-4' src={coverImage} alt={`Cover of ${selectedBook.title}`} />
                )}
            </div>
            <div className='h-[50%] flex flex-col gap-4'>
                <h1 className="text-3xl font-bold">{selectedBook.title}</h1>
                <p>{selectedBook.description || "No description available."}</p>
                <h2 className="text-2xl font-semibold mt-4">Authors:</h2>
                <ul>
                    {/** if selectedBook.authors is an array and has elements. If true, it maps over the authors and renders them in a list. */}
                    {Array.isArray(selectedBook.authors) && selectedBook.authors.length > 0 ? (
                        selectedBook.authors.map((author) => (

                            //If author.key exists, it creates a link to the author's page.
                            //If author.key is missing, it displays a message indicating no valid link.
                            //If no authors are available, it shows a fallback message.
                            <li key={author.key}>
                                {author.key ? (
                                    <Link to={`/authors/${author.key.split('/').pop()}`}>
                                        {author.name}
                                    </Link>
                                ) : (
                                    <span>No valid author link</span>
                                )}
                            </li>
                        ))
                    ) : (
                        <li>No authors available.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default BookDetails;
