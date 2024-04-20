import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductsType, ShoppingCartProps } from '../types';
import { CartIcon } from './cart-icon/CartIcon';

export function ShoppingCart({ removeProduct, cart, setCart, quantity }
: ShoppingCartProps) {
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartWithInitializedQuantity = storedCart.map((product: ProductsType) => ({
      ...product,
      quantity: product.quantity || 1,
    }));
    setCart(cartWithInitializedQuantity);
  }, [setCart]);

  const increaseQuantity = (productId: string) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((product) => product.id === productId);

    if (productIndex !== -1 && updatedCart[productIndex].quantity
      < updatedCart[productIndex].available_quantity) {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const decreaseQuantity = (productId: string) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      updatedCart[productIndex].quantity = Math.max(updatedCart[productIndex]
        .quantity - 1, 1);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <div>
      <CartIcon
        count={ quantity }
      />
      <button>
        <Link data-testid="checkout-products" to="/checkout">
          Ir para pagamento
        </Link>
      </button>
      <button>
        <Link data-testid="go-home" to="/">
          Voltar para a home
        </Link>
      </button>
      {cart.length ? (
        <div>
          <h2>Produtos no Carrinho:</h2>
          <ul>
            {cart.map((product, index) => (
              <li key={ index }>
                <p data-testid="shopping-cart-product-name">{product.title}</p>
                <p data-testid="shopping-cart-product-quantity">
                  Quantidade:
                  <button
                    type="button"
                    onClick={ () => decreaseQuantity(product.id) }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    type="button"
                    onClick={ () => increaseQuantity(product.id) }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                </p>
                <button
                  type="button"
                  onClick={ () => removeProduct(product.id) }
                  data-testid="remove-product"
                >
                  Remover produto
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>
      )}
    </div>
  );
}
