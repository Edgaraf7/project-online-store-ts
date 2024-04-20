import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductsType } from '../../types';
import { CartIcon } from '../cart-icon/CartIcon';
import styles from './Checkout.module.css';

export function Checkout({ quantity }: { quantity: number }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
  });

  const [error, setError] = useState(false);
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const validate = formData.fullName.length > 0 && formData.email.length > 0
    && formData.cpf.length > 0 && formData.phone.length > 0
    && formData.cep.length > 0 && formData.address.length > 0
    && formData.paymentMethod.length > 0;
    setError(!validate);
    if (validate) {
      localStorage.removeItem('cart');
      navigate('/');
    }
  };

  return (
    <div>
      <CartIcon
        count={ quantity }
      />
      <h2>Checkout</h2>
      <div>
        <h3>Resumo do Pedido</h3>
        <ul>
          {cart.map((product: ProductsType, index: number) => (
            <li key={ index }>
              {product.title}
            </li>
          ))}
        </ul>
      </div>
      <form className={ styles.formCheckout }>
        <div>
          <label htmlFor="fullName">Nome Completo</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={ formData.fullName }
            onChange={ handleInputChange }
            data-testid="checkout-fullname"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={ formData.email }
            onChange={ handleInputChange }
            data-testid="checkout-email"
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={ formData.cpf }
            onChange={ handleInputChange }
            data-testid="checkout-cpf"
          />
        </div>
        <div>
          <label htmlFor="phone">Telefone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={ formData.phone }
            onChange={ handleInputChange }
            data-testid="checkout-phone"
          />
        </div>
        <div>
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={ formData.cep }
            onChange={ handleInputChange }
            data-testid="checkout-cep"
          />
        </div>
        <div>
          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            id="address"
            name="address"
            value={ formData.address }
            onChange={ handleInputChange }
            data-testid="checkout-address"
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Forma de Pagamento</label>
          <input
            type="radio"
            id="paymentMethod-boleto"
            name="paymentMethod"
            value="Boleto"
            checked={ formData.paymentMethod === 'Boleto' }
            onChange={ handleInputChange }
            data-testid="boleto-payment"
          />
          <label htmlFor="paymentMethod-boleto">Boleto</label>
          <input
            type="radio"
            id="paymentMethod-visa"
            name="paymentMethod"
            value="Visa"
            checked={ formData.paymentMethod === 'Visa' }
            onChange={ handleInputChange }
            data-testid="visa-payment"
          />
          <label htmlFor="paymentMethod-visa">Visa</label>
          <input
            type="radio"
            id="paymentMethod-mastercard"
            name="paymentMethod"
            value="Mastercard"
            checked={ formData.paymentMethod === 'Mastercard' }
            onChange={ handleInputChange }
            data-testid="master-payment"
          />
          <label htmlFor="paymentMethod-mastercard">MasterCard</label>
          <input
            type="radio"
            id="paymentMethod-elo"
            name="paymentMethod"
            value="Elo"
            checked={ formData.paymentMethod === 'Elo' }
            onChange={ handleInputChange }
            data-testid="elo-payment"
          />
          <label htmlFor="paymentMethod-elo">Elo</label>
        </div>
        <button onClick={ handleSubmit } data-testid="checkout-btn">
          Finalizar Compra
        </button>
        {error && (
          <p data-testid="error-msg">Campos inválidos</p>
        )}
      </form>
      <button>
        <Link to="/" data-testid="shopping-cart-button">
          Voltar às Compras
        </Link>
      </button>
    </div>
  );
}
