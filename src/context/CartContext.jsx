import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);

    // Load history from local storage if needed, or just keep in memory for session
    
    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
        trackAction(product.id, 'cart');
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(p => p.id !== productId));
    };

    const trackAction = (productId, type) => {
        setHistory(prev => [...prev, { productId, type, timestamp: Date.now() }]);
        console.log(`Tracked action: ${type} for product ${productId}`);
    };

    const clearCart = () => {
        // Track 'buy' signal for all items in cart before clearing
        cart.forEach(item => {
            trackAction(item.id, 'buy');
        });
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, history, addToCart, removeFromCart, trackAction, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
