import styles from './Header.module.css';
import iconFront from '../assets/icon-front-end-header.svg';

export function Header() {
  return (
    <header className={ styles.headerContainer }>
      <nav>
        <div>
          <img
            className={ styles.imgContainer }
            src={ iconFront }
            alt="front-end-icon"
          />
        </div>
        <ul className={ styles.ulContainer } />
      </nav>
    </header>
  );
}
