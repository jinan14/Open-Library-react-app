import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import axios from 'axios';

const AuthorDetails = () => {
  const { id } = useParams();
  const { selectedAuthor, setSelectedAuthor } = useStore();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/authors/${id}.json`);
        console.log(response.data); // Log the response data for debugging
        setSelectedAuthor(response.data);
      } catch (error) {
        console.error('Error fetching author details:', error);
      }
    };

    fetchAuthorDetails();
  }, [id, setSelectedAuthor]);

  if (!selectedAuthor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl">{selectedAuthor.name}</h1>
      <p>Bio: {selectedAuthor.bio || "No bio available."}</p>
      <h2>Books by {selectedAuthor.name}</h2>
      {/* Assuming selectedAuthor.books is an array of books */}
      <ul>
        {selectedAuthor.books && selectedAuthor.books.length > 0 ? (
          selectedAuthor.books.map((book) => (
            <li key={book.key}>
              <a href={`/books/${book.key.split('/').pop()}`}>{book.title}</a>
            </li>
          ))
        ) : (
          <li>No books available.</li>
        )}
      </ul>
    </div>
  );
};

export default AuthorDetails;
