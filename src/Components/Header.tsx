import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="grid items-center grid-cols-3 py-2 bg-blue-950">
      <section></section>
      <section className="text-blue-200 text-2xl">
        {' '}
        Avaliação De Desempenho
      </section>
      <section>
        <Link to="/login">
          <button className={styles.btn}>Login</button>
        </Link>
      </section>
    </header>
  );
};

export default Header;
