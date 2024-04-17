import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={ <ProductListingPage /> } />
          <Route path="/cart" element={ <ShoppingCartPage /> } />
          {' '}
          {}
        </Routes>
      </header>
    </div>
  );
}

export default App;
