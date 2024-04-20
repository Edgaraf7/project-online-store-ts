import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={ styles.layoutContainer }>
      <Header />
      <Outlet />
    </div>
  );
}
