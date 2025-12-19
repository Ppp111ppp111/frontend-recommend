import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProducts, getRecommendations } from '../api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch products", error);
                setError("Unable to load products. Please ensure the backend is running.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-center">
                <div className="text-red-500 text-xl font-medium">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="space-y-2 py-4 border-b border-gray-200 mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Discover <span className="text-[#c7511f]">New Gear</span>
                </h1>
                <p className="text-gray-600 max-w-2xl text-lg">
                    Check out our curated collection of premium electronics and fashion items.
                </p>
            </header>

            {/* AI Recommendations Section */}
            <RecommendationsSection />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

const RecommendationsSection = () => {
    const { history } = useCart();
    const [recommendations, setRecommendations] = useState([]);
    
    useEffect(() => {
        const fetchRecs = async () => {
            if (history.length > 0) {
                try {
                    const data = await getRecommendations(history);
                    setRecommendations(data);
                } catch (e) {
                    console.error(e);
                }
            }
        };
        fetchRecs();
    }, [history.length]);

    if (history.length === 0 || recommendations.length === 0) return null;

    return (
        <div className="mb-10 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                <Sparkles className="w-6 h-6 text-[#c7511f] fill-current" />
                Recommended For You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(product => (
                    <ProductCard key={product.id} product={product} isRecommended={true} />
                ))}
            </div>
            <div className="h-px bg-gray-200 w-full mt-8" />
        </div>
    );
};

export default Home;
