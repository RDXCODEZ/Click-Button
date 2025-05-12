import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className={styles.header}>
 <div className={styles.logo}>
  <img src="/new-logo.png" alt="Logo" className={styles.logoImage} />
</div>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/services">Services</Link>
            <ul className={styles.submenu}>
              <li><Link to="/services/design">Design</Link></li>
              <li><Link to="/services/development">Development</Link></li>
            </ul>
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact" className={styles.contactBtn}>Contact Us</Link></li>
        </ul>
      </nav>

      <div className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
};

export default Header;
