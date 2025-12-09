import React from 'react';
import { Button } from '../components/ui/button';
import { Music, Image as ImageIcon, BookOpen } from 'lucide-react';
import { authorInfo } from '../data/author';

const Extras = () => {
  return (
    <div className="extras-page">
      <div className="container">
        <h1 className="page-title">Extras</h1>
        <p className="page-description">Dive deeper into the world of the stories with playlists, moodboards, and exclusive bonus content.</p>

        <div className="extras-grid">
          {/* Spotify Playlist */}
          <div className="extra-card">
            <div className="extra-icon">
              <Music size={48} />
            </div>
            <h3 className="extra-title">Playlist</h3>
            <p className="extra-description">
              Listen to the curated playlist that inspired the stories and characters.
            </p>
            <Button className="btn-primary" asChild>
              <a href={authorInfo.socialMedia.spotify || '#'} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
            </Button>
          </div>

          {/* Pinterest Moodboard */}
          <div className="extra-card">
            <div className="extra-icon">
              <ImageIcon size={48} />
            </div>
            <h3 className="extra-title">Moodboard</h3>
            <p className="extra-description">
              Explore visual inspirations and aesthetics behind the stories.
            </p>
            <Button className="btn-primary" asChild>
              <a href={authorInfo.socialMedia.pinterest || '#'} target="_blank" rel="noopener noreferrer">
                View on Pinterest
              </a>
            </Button>
          </div>

          {/* Bonus Chapters */}
          <div className="extra-card">
            <div className="extra-icon">
              <BookOpen size={48} />
            </div>
            <h3 className="extra-title">Bonus Chapters</h3>
            <p className="extra-description">
              Access exclusive bonus scenes and extended chapters from the books.
            </p>
            <Button className="btn-primary">
              Read Bonus Content
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extras;
