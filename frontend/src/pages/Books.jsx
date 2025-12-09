import React, { useState } from 'react';
import { books, comingSoonBooks } from '../data/books';
import { Button } from '../components/ui/button';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const BookCard = ({ book }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="book-card">
          <div className="book-card-image">
            <img src={book.coverImage} alt={book.title} />
            {book.status === 'coming-soon' && (
              <div className="book-status-badge">Coming Soon</div>
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
              <span className="book-series-badge">{book.series} {book.bookNumber && `#${book.bookNumber}`}</span>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="book-modal-content">
          <div className="book-modal-image">
            <img src={book.coverImage} alt={book.title} />
          </div>
          <div className="book-modal-details">
            <h2 className="book-modal-title">{book.title}</h2>
            <p className="book-modal-author">by {book.author}</p>
            {book.releaseDate && (
              <p className="book-modal-release">Release: {book.releaseDate}</p>
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
            {book.status === 'available' && (
              <div className="book-links">
                {book.amazonLink && book.amazonLink !== '#' && (
                  <Button className="btn-primary" asChild>
                    <a href={book.amazonLink} target="_blank" rel="noopener noreferrer">
                      Buy on Amazon <ExternalLink size={16} className="ml-2" />
                    </a>
                  </Button>
                )}
                {book.goodreadsLink && book.goodreadsLink !== '#' && (
                  <Button className="btn-secondary" asChild>
                    <a href={book.goodreadsLink} target="_blank" rel="noopener noreferrer">
                      Goodreads <BookOpen size={16} className="ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Books = () => {
  return (
    <div className="books-page">
      <div className="container">
        <h1 className="page-title">Books</h1>
        <p className="page-description">Explore the collection of stories that invite you on journeys of self-discovery, resilience, and hope.</p>
        
        {/* Available Books */}
        <section className="books-section">
          <h2 className="section-subtitle">Available Now</h2>
          <div className="books-grid">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Coming Soon Books */}
        {comingSoonBooks.length > 0 && (
          <section className="books-section">
            <h2 className="section-subtitle">Coming Soon</h2>
            <div className="books-grid">
              {comingSoonBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Books;
