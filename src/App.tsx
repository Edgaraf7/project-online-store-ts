import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={ <ProductListingPage /> } />
          <Route path="/cart" element={ <ShoppingCartPage /> } />
          {' '}
          {}
          <Route path="/product/:productId" element={ <ProductDetailPage /> } />
        </Routes>
      </header>
    </div>
  );
}

export default App;
