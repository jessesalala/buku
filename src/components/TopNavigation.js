import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './TopNavigation.css';
import TranslatedText from './TranslatedText';
import LanguageSwitcher from './LanguageSwitcher';

const TopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { to: '/discussion-forum', text: 'Jukwaa la Majadiliano'},
    { to: '/coach-dashboard', text: 'Kocha' },
    { to: '/days-alive', text: 'Siku za Uhai' },
    { to: '/time-assessment', text: 'Tathmini ya Muda' },
    { to: '/ripoti-ya-muda', text: 'Ripoti ya Muda' },
    { to: '/uwekezaji-wa-siku', text: 'Uwekezaji wa Siku' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (!event.target.closest('.mobile-menu-button')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="top-nav-wrapper">
      {/* Desktop navigation (hidden on mobile) */}
      <div className="desktop-nav">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.to} className="nav-link">
            {link.icon && <span className="nav-icon">{link.icon}</span>}
            {link.text}
          </Link>
        ))}
      </div>

      {/* Mobile menu button - fixed top right */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile dropdown card */}
      {isOpen && (
        <div className="mobile-nav-card" ref={dropdownRef}>
          <div className="mobile-nav-content">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.icon && <span className="nav-icon">{link.icon}</span>}
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavigation;