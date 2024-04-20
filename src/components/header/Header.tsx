import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import iconFront from '../assets/icon-front-end-header.svg';

export function Header() {
  return (
    <header className={ styles.headerContainer }>
      <nav>
        <div>
          <Link to="/" className={ styles.link }>
            <img
              className={ styles.imgContainer }
              src={ iconFront }
              alt="front-end-icon"
            />
          </Link>
        </div>
        <ul className={ styles.ulContainer } />
      </nav>
    </header>
  );
}
