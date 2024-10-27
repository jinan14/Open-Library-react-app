

import {create} from 'zustand';

export const useStore = create((set) => ({
  books: [],
  selectedBook: null,
  selectedAuthor: null,
  setBooks: (books) => set({ books }),
  setSelectedBook: (book) => set({ selectedBook: book }),
  setSelectedAuthor: (author) => set({ selectedAuthor: author }),
}));

 
