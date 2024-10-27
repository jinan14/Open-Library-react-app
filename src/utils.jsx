

// utils.js
export const getCoverImage = (book) => {
    const coverId = book.cover_id || book.cover_i; // Check for cover_id first, then cover_i
    return coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : 'https://via.placeholder.com/150'; // Placeholder image
};
