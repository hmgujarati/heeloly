import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { ExternalLink, BookOpen, Loader } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookCard = ({ book }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="book-card">
          <div className="book-card-image">
            <img src={book.cover_image} alt={book.title} />
            {book.status === 'upcoming' && (
              <div className="book-status-badge">Coming Soon</div>
            )}
            {book.status === 'new-release' && (
              <div className="book-status-badge" style={{ background: 'var(--accent-red)' }}>New Release</div>
            )}
          </div>
          <div className="book-card-content">
            <h3 className="book-card-title">{book.title}</h3>
            <p className="book-card-author">{book.author}</p>
            {book.series && <p className="book-card-series">{book.series}</p>}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="book-modal">
        <DialogHeader>
          <DialogTitle>
            {book.series !== 'Standalone' && book.series !== 'TBA' && (
              <span className="book-series-badge">{book.series} {book.book_number && `#${book.book_number}`}</span>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="book-modal-content">
          <div className="book-modal-image">
            <img src={book.cover_image} alt={book.title} />
          </div>
          <div className="book-modal-details">
            <h2 className="book-modal-title">{book.title}</h2>
            <p className="book-modal-author">by {book.author}</p>
            {book.release_date && (
              <p className="book-modal-release">Release: {book.release_date}</p>
            )}
            {book.genres && book.genres.length > 0 && (
              <div className="book-genres">
                {book.genres.map((genre, idx) => (
                  <span key={idx} className="genre-tag">{genre}</span>
                ))}
              </div>
            )}
            <div className="book-blurb">
              <p>{book.blurb}</p>
            </div>
            {book.status === 'available' || book.status === 'new-release' ? (
              <div className="book-links">
                {book.buy_links && book.buy_links.map((link, idx) => (
                  <Button key={idx} className="btn-primary" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name} <ExternalLink size={16} className="ml-2" />
                    </a>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BooksNew = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableBooks = books.filter(b => b.status === 'available' || b.status === 'new-release');
  const upcomingBooks = books.filter(b => b.status === 'upcoming');

  if (loading) {
    return (
      <div className="books-page" style={{ padding: '100px 0', textAlign: 'center' }}>
        <Loader size={48} className="animate-spin" style={{ margin: '0 auto', color: 'var(--accent-silver)' }} />
        <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Loading books...</p>
      </div>
    );
  }

  return (
    <div className="books-page">
      <div className="container">
        <h1 className="page-title">Books</h1>
        
        {/* Available Books */}
        {availableBooks.length > 0 && (
          <section className="books-section">
            <h2 className="section-subtitle">Available Now</h2>
            <div className="books-grid">
              {availableBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Books */}
        {upcomingBooks.length > 0 && (
          <section className="books-section">
            <h2 className="section-subtitle">Coming Soon</h2>
            <div className="books-grid">
              {upcomingBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BooksNew;
