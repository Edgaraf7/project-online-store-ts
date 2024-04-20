import { Routes, Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Home } from './components/home/Home';
import { ShoppingCart } from './components/ShoppingCart';
import { DetailsCard } from './components/DetailsCard';
import { Checkout } from './components/checkout/Checkout';
import { ProductsType } from './types';
import styles from './global.module.css';
import { Layout } from './components/layout/Layout';

function App() {
  const [cart, setCart] = useState<ProductsType[]>([]);
  const [quantity, setQuantity] = useState(0);

  const addToCart = (product: ProductsType) => {
    if (!product.quantity) {
      product.quantity = 1;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeProduct = (productId: string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateItensQuantity = useCallback(() => {
    const amount = cart.reduce((acc, curr) => {
      acc += curr.quantity;
      return acc;
    }, 0);
    return amount;
  }, [cart]);

  useEffect(() => {
    setQuantity(calculateItensQuantity());
  }, [calculateItensQuantity]);

  return (
    <div className={ styles.container }>
      <Routes>
        <Route element={ <Layout /> }>
          <Route
            path="/"
            element={ <Home
              quantity={ quantity }
              addToCart={ addToCart }
            /> }
          />
          <Route
            path="/detailscard/:id"
            element={ <DetailsCard
              quantity={ quantity }
            /> }
          />
          <Route
            path="/shopping-cart"
            element={ <ShoppingCart
              quantity={ quantity }
              cart={ cart }
              setCart={ setCart }
              removeProduct={ removeProduct }
            /> }
          />
          <Route path="/checkout" element={ <Checkout quantity={ quantity } /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
