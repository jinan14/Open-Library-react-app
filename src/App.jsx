import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import AuthorDetails from './components/AuthorDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} /> 
        <Route path="/authors/:id" element={<AuthorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
