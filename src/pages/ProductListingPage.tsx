import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

interface Category {
  id: string;
  name: string;
}

function ProductListingPage() {
  const [categories, setCategories] = useState<Category[]>([]);
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

  return (
    <div className="product-listing">
      <h1>Lista de Produtos</h1>
      <input type="text" placeholder="Buscar produtos..." />
      {/* Renderize a lista de categorias */}
      <div className="categories">
        <h2>Categorias</h2>
        <ul>
          {categories.map((category) => (
            <li key={ category.id }>
              {/* Utilize um Link para a rota de filtro por categoria */}
              <Link to={ `/category/${category.id}` } data-testid="category">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
