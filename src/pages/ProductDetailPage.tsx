// ProductDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../services/api';

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        if (!productId) return;
        const productData: Product = await api.getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setProduct(null);
      }
    }

    fetchProductDetails();
  }, [productId]);

  return (
    <div className="product-detail">
      {product ? (
        <>
          <img
            src={ product.thumbnail }
            alt={ product.title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-name">{product.title}</p>
          <p data-testid="product-detail-price">
            R$
            {product.price}
          </p>
          <Link to="/cart" data-testid="shopping-cart-button">
            Carrinho de Compras
          </Link>
        </>
      ) : (
        <p>Carregando detalhes do produto...</p>
      )}
    </div>
  );
}

export default ProductDetailPage;
