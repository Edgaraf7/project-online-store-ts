import { Link } from 'react-router-dom';

function ProductListingPage() {
  return (
    <div className="product-listing">
      <h1>Lista de Produtos</h1>
      <input type="text" placeholder="Buscar produtos..." />
      <div className="product-list">
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
      <Link to="/cart" data-testid="shopping-cart-button">Carrinho de Compras</Link>
    </div>
  );
}

export default ProductListingPage;
