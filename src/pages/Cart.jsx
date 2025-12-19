import { ArrowRight, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getRecommendations } from '../api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, clearCart, history } = useCart();
    const [recommendations, setRecommendations] = useState([]);
    const [loadingRecs, setLoadingRecs] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (history.length === 0) return;
            
            setLoadingRecs(true);
            try {
                // Filter out 'view' type if you only want recommendations based on cart actions, 
                // but the backend uses both.
                // We'll send the full history.
                const recs = await getRecommendations(history);
                // Filter out items already in cart or simply show them
                // Ideally backend handles filtering but we can do client side too if needed
                setRecommendations(recs);
            } catch (error) {
                console.error("Failed to get recommendations", error);
            } finally {
                setLoadingRecs(false);
            }
        };

        fetchRecommendations();
    }, [history.length]); // Re-fetch when history grows (e.g. adding more items)

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                        <span className="w-8 h-8 rounded-lg bg-primary text-black flex items-center justify-center text-sm font-bold shadow-sm">
                            {cart.length}
                        </span>
                        Shopping Cart
                    </h2>

                    {cart.length === 0 ? (
                        <div className="p-12 border border-dashed border-gray-300 bg-white rounded-lg text-center space-y-4">
                            <div className="text-4xl opacity-50">🛒</div>
                            <p className="text-gray-600">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                                            📦
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.category}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            
                            <div className="flex justify-end pt-4">
                                <button 
                                    onClick={clearCart}
                                    className="btn btn-primary flex items-center gap-2 shadow-md hover:shadow-lg transform active:scale-95 transition-all text-black font-semibold"
                                >
                                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recommendations Section */}
                {history.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#c7511f]">
                            <Sparkles className="w-5 h-5 fill-current" />
                            <h3 className="font-bold uppercase tracking-wider text-sm">AI Recommendations</h3>
                        </div>

                        {loadingRecs ? (
                            <div className="space-y-4 animate-pulse">
                                {[1,2,3].map(i => (
                                    <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {recommendations.map(rec => (
                                    <ProductCard key={rec.id} product={rec} isRecommended={true} />
                                ))}
                                {recommendations.length === 0 && (
                                    <p className="text-sm text-gray-500">Add items to cart or view products to get recommendations.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
