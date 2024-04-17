function ShoppingCartPage() {
  return (
    <div className="shopping-cart">
      <h1>Carrinho de Compras</h1>
      <div className="cart-content">
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    </div>
  );
}

export default ShoppingCartPage;
