import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  // { label: 'Home', to: '/' },
  // {
  //   label: 'Courses',
  //   dropdown: [
  //     { label: 'Data Analytics', to: '/courses/data-analytics' },
  //     { label: 'Data Science', to: '/courses/data-science' },
  //     { label: 'Python Fullstack', to: '/courses/python' },
  //     { label: 'Java Fullstack', to: '/courses/java' },
  //   ],
  // },
  // {
  //   label: 'Batches',
  //   dropdown: [
  //     { label: 'Weekday Batch', to: '/batches/weekday' },
  //     { label: 'Weekend Batch', to: '/batches/weekend' },
  //     { label: 'Online Batch', to: '/batches/online' },
  //   ],
  // },
  // { label: 'Courses', to: '/courses' },
  // { label: 'Placements', to: '/placements' },
  // { label: 'About Us', to: '/about-us' },
  // { label: 'Contact', to: '/contact' },
];

/* ── Dropdown item ─────────────────────────────────────────── */
function DropdownMenu({ items, visible }) {
  return (
    <div className={`nav-dropdown${visible ? ' nav-dropdown--open' : ''}`}>
      {items.map((item) => ( 
          <Link key={item.label} to={item.to} className="nav-dropdown-item">
            {item.label}
          </Link>   
      ))}
    </div>
  );
}

/* ── Desktop nav link (with optional dropdown) ─────────────── */
function NavLink({ link }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (link.dropdown) {
    return (
      <div
        ref={ref}
        className={`nav-link nav-link--dropdown${open ? ' nav-link--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        {link.label}
        <FaChevronDown className="nav-link-chev" size={10} />
        <DropdownMenu items={link.dropdown} visible={open} />
      </div>
    );
  }

  return (
    <Link to={link.to} className="nav-link">
      {link.label}
    </Link>
  );
}

/* ── Mobile accordion item ─────────────────────────────────── */
function MobileNavLink({ link, onClose }) {
  const [open, setOpen] = useState(false);

  if (link.dropdown) {
    return (
      <div className="mob-nav-group">
        <button className="mob-nav-link" onClick={() => setOpen((o) => !o)}>
          {link.label}
          <FaChevronDown
            size={11}
            style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </button>
        <div className={`mob-nav-sub${open ? ' mob-nav-sub--open' : ''}`}>
          {link.dropdown.map((item) => (
            <Link key={item.label} to={item.to} className="mob-nav-sub-item" onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link to={link.to} className="mob-nav-link" onClick={onClose}>
      {link.label}
    </Link>
  );
}

/* ── Navbar ────────────────────────────────────────────────── */
const Navbar = ({ logoImg, logoText, logoLink }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      {/* Logo */}
      <Link className="nav-logo" to="/">
        {logoImg ? (
          <img src={logoImg} alt="Logo" />
        ) : (
          <FaGraduationCap size={28} color="var(--clr-primary)" />
        )} 
      </Link>

      {/* Desktop links */}
      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.label} link={link} />
        ))}
      </div>

      {/* CTA — desktop */}
      <Link to={logoLink || 'tel:+918056477261'} className="nav-cta nav-cta--desktop">
        📞 Call Now
      </Link>

      {/* Hamburger — mobile */}
      <button
        className="nav-burger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer${menuOpen ? ' nav-mobile-drawer--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <MobileNavLink key={link.label} link={link} onClose={() => setMenuOpen(false)} />
        ))}
        <Link
          to={logoLink || 'tel:+918056477261'}
          className="nav-cta nav-cta--mobile"
          onClick={() => setMenuOpen(false)}
        >
          📞 Call Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;