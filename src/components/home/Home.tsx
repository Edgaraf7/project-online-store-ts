import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Categories } from '../categories/Categories';
import { getProductsByCategoryFromId, getProductsFromQuery } from '../../services/api';
import { ProductsType, CartIconProps } from '../../types';
import { ProductsCard } from '../producs-card/ProductsCard';
import { CartIcon } from '../cart-icon/CartIcon';
import styles from './Home.module.css';

export function Home({ addToCart, quantity }: CartIconProps) {
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [foundProducts, setFoundProducts] = useState(false);

  const getProducts = async (input: string) => {
    const response = await getProductsFromQuery(input);
    const { results } = response;
    setProducts(results);
    setFoundProducts(true);
  };

  const categoryTreatment = async (id: string) => {
    const response = await getProductsByCategoryFromId(id);
    const { results } = response;
    setProducts(results);
    setFoundProducts(true);
  };

  return (
    <div className={ styles.homeContainer }>
      <aside className={ styles.sidebar }>
        {' '}
        <CartIcon count={ quantity } />
        <Categories treatment={ categoryTreatment } />
      </aside>
      <main className={ styles.mainContent }>
        <form className={ styles.queryForm }>
          <label>
            <input
              className={ styles.queryInput }
              data-testid="query-input"
              type="text"
              placeholder="Search for a product"
              value={ searchInput }
              onChange={ (event) => {
                setSearchInput(event.target.value);
              } }
            />
          </label>
          <button
            className={ styles.queryButton }
            type="button"
            data-testid="query-button"
            onClick={ () => getProducts(searchInput) }
          >
            Pesquisar
          </button>
        </form>
        {!foundProducts && products.length === 0 ? (
          <p className={ styles.homeInitialMessage } data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : (
          <div className={ styles.grid }>
            {products.length === 0 ? (
              <p>Nenhum produto foi encontrado</p>
            ) : (
              products.map((product) => (

                <div className={ styles.productItem } key={ product.id }>
                  <ProductsCard
                    id={ product.id }
                    thumbnail={ product.thumbnail }
                    title={ product.title }
                    price={ product.price }
                    quantity={ product.quantity }
                    available_quantity={ product.available_quantity }
                    shipping={ product.shipping.free_shipping }
                  />
                  <button
                    className={ styles.addToCartButton }
                    data-testid="product-add-to-cart"
                    onClick={ () => addToCart(product) }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))
            )}
          </div>
        )}
        <button className={ styles.cartButton } type="button">
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Ir ao carrinho de compras
          </Link>
        </button>
      </main>
    </div>
  );
}
