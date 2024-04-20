import { Link } from 'react-router-dom';
import styles from './CartIcon.module.css';
import cartImg from '../assets/icon-carrinho-compras.svg';

export function CartIcon({ count }: { count: number }) {
  return (
    <button type="button" className={ styles.cartButton }>
      {' '}
      <Link to="/shopping-cart" className={ styles.cartLink }>
        {' '}
        <img
          src={ cartImg }
          alt="Shopping Cart"
          className={ styles.cartImage }
        />
        {' '}
      </Link>
      <span
        data-testid="shopping-cart-size"
        className={ styles.cartCount }
      >
        {`: ${count}`}

      </span>
      {' '}

    </button>
  );
}
