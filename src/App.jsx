import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Home from './pages/Home';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-background text-white selection:bg-primary/30">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
