import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={ <ProductListingPage /> } />
        </Routes>
      </header>
    </div>
  );
}

export default App;
