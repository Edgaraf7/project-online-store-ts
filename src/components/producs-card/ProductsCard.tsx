import { Link } from 'react-router-dom';
import { ProductsType } from '../../types';
import styles from './ProductsCard.module.css';

export function ProductsCard({ id, title, thumbnail,
  price, available_quantity, shipping }:ProductsType) {
  return (
    <div className={ styles.grid }>
      <div data-testid="product" className={ styles.card }>
        <p
          className={ styles.title }
        >
          { title }
        </p>
        <img src={ thumbnail } alt={ title } />
        <p className={ styles.price }>{ `R$ ${price.toFixed(2)}` }</p>
        { shipping && <p data-testid="free-shipping">Frete grátis</p>}
        <p>
          { `Quantidade disponível: ${available_quantity}`}
        </p>
        <Link
          data-testid="product-detail-link"
          to={ `/detailscard/${id}` }
        >
          Ir para detalhes
        </Link>
      </div>
    </div>

  );
}
