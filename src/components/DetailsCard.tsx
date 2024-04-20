import { Link, useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { getDetailsFromId } from '../services/api';
import { DetailsType, Review } from '../types';
import { CartIcon } from './cart-icon/CartIcon';

export function DetailsCard({ quantity }: { quantity: number }) {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<DetailsType | undefined>();
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [evaluation, setEvaluation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

  const addToCart = (product: DetailsType) => {
    if (product) {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      existingCart.push(product);
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }
  };

  const stringId = id as string;

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(stringId)
    || '[]');
    setReviews(storedReviews);
  }, [stringId]);

  useEffect(() => {
    if (id) {
      const detailsTreatment = async () => {
        const response = await getDetailsFromId(id);
        setDetails({
          title: response.title,
          thumbnail: response.thumbnail,
          price: response.price,
          available_quantity: response.available_quantity,
          description: response.description,
          warranty: response.warranty,
          shipping: response.shipping.free_shipping,
        });
      };
      detailsTreatment();
    }
  }, [id]);

  const handleRatingChange = (index: number) => {
    setRating(index);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email || !rating || rating === 0) {
      setErrorMessage('Campos inválidos');
      return;
    }

    const newReview = {
      email,
      text: evaluation,
      rating,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(stringId, JSON.stringify(updatedReviews));
    setEmail('');
    setRating(0);
    setEvaluation('');
    setErrorMessage('');
  };

  useEffect(() => {
    if (email || rating || evaluation) {
      setErrorMessage('');
    }
  }, [email, rating, evaluation]);

  return (
    <>
      <CartIcon
        count={ quantity }
      />
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        Ir ao carrinho de compras
      </Link>
      <h1 data-testid="product-detail-name">{details?.title}</h1>
      <img
        data-testid="product-detail-image"
        src={ details?.thumbnail }
        alt={ details?.title }
      />
      <p data-testid="product-detail-price">{`R$ ${details?.price.toFixed(2)}`}</p>
      <p>{`Quantidade disponível: ${details?.available_quantity}`}</p>
      <p>
        {`Descrição: ${
          details?.description === undefined
            ? 'Informações indisponíveis'
            : details?.description
        }`}
      </p>
      { details?.shipping && <p data-testid="free-shipping">Frete grátis</p>}
      <p>
        {`Informações de garantia: ${
          details?.warranty === null
            ? 'Informações de garantia indisponíveis'
            : details?.warranty
        }`}
      </p>
      {details && (
        <button
          type="button"
          onClick={ () => addToCart(details) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      )}

      <form>
        <label htmlFor="email-input">Digite seu email:</label>
        <input
          type="email"
          id="email-input"
          placeholder="Digite seu email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          data-testid="product-detail-email"
        />
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={ value }>
              <input
                type="radio"
                value={ value }
                checked={ rating === value }
                onChange={ () => handleRatingChange(value) }
                data-testid={ `${value}-rating` }
              />
              {value}
            </label>
          ))}
        </div>
        <label htmlFor="evaluation-textarea">
          Escreva uma avaliação:
          <textarea
            id="evaluation-textarea"
            placeholder="Escreva uma avaliação"
            value={ evaluation }
            onChange={ (event) => setEvaluation(event.target.value) }
            data-testid="product-detail-evaluation"
          />
        </label>
        <button
          type="submit"
          onClick={ handleSubmit }
          data-testid="submit-review-btn"
        >
          Enviar Avaliação
        </button>
      </form>

      {errorMessage && (
        <p data-testid="error-msg">{errorMessage}</p>
      )}

      {reviews.length > 0 && (
        <div>
          <h2>Avaliações:</h2>
          {reviews.map((review, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">
                {review.email}
              </p>
              <p data-testid="review-card-rating">
                {review.rating}
              </p>
              <p data-testid="review-card-evaluation">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
