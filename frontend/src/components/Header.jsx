import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { 
      name: 'About', 
      path: '/about',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Bio', path: '/bio' },
        { name: 'FAQs', path: '/faqs' }
      ]
    },
    { name: 'Extras', path: '/extras' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;
  const isAboutActive = () => ['/about', '/bio', '/faqs'].includes(location.pathname);

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="site-logo">
          <img 
            src="https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/us3nn3v6_logo%20Heeloly%20u.png" 
            alt="Heeloly Upasani" 
            className="header-logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <div 
                key={link.path} 
                className="nav-dropdown-container"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  className={`nav-link nav-dropdown-trigger ${isAboutActive() ? 'active' : ''}`}
                >
                  {link.name}
                  <ChevronDown size={16} className={`dropdown-arrow ${aboutDropdownOpen ? 'open' : ''}`} />
                </button>
                {aboutDropdownOpen && (
                  <div className="nav-dropdown-menu">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-dropdown-item ${isActive(item.path) ? 'active' : ''}`}
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <div key={link.path} className="mobile-nav-dropdown">
                <button 
                  className={`mobile-nav-link mobile-dropdown-trigger ${isAboutActive() ? 'active' : ''}`}
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                >
                  {link.name}
                  <ChevronDown size={16} className={`dropdown-arrow ${aboutDropdownOpen ? 'open' : ''}`} />
                </button>
                {aboutDropdownOpen && (
                  <div className="mobile-dropdown-menu">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`mobile-dropdown-item ${isActive(item.path) ? 'active' : ''}`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setAboutDropdownOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
