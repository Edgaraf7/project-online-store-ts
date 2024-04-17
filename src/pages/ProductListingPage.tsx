import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

function ProductListingPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData: Category[] = await api.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }

    loadCategories();
  }, []);

  const handleSearch = async () => {
    try {
      const productsData = await api.searchProducts(searchTerm);
      setSearchedProducts(productsData.results);
      setSearchError(false); // Reset search error flag
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchError(true); // Set search error flag
    }
  };

  return (
    <div className="product-listing">
      <h1>Lista de Produtos</h1>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={ searchTerm }
        onChange={ (e) => setSearchTerm(e.target.value) }
        data-testid="query-input"
      />
      <button onClick={ handleSearch } data-testid="query-button">
        Buscar
      </button>
      <div className="categories">
        <h2>Categorias</h2>
        <ul>
          {categories.map((category) => (
            <li key={ category.id }>
              <Link to={ `/category/${category.id}` } data-testid="category">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list">
        {searchedProducts.length === 0 && !searchError ? (
          <p data-testid="home-initial-message">
            {searchTerm
              ? 'Nenhum produto foi encontrado.'
              : 'Digite algum termo de pesquisa ou escolha uma categoria.'}
          </p>
        ) : (
          searchedProducts.map((product) => (
            <div key={ product.id } data-testid="product">
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{product.title}</p>
              <p>
                R$
                {product.price}
              </p>
            </div>
          ))
        )}
      </div>
      <Link to="/cart" data-testid="shopping-cart-button">
        Carrinho de Compras
      </Link>
    </div>
  );
}

export default ProductListingPage;
