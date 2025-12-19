import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, isRecommended = false }) => {
    const { addToCart, trackAction } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleClick = () => {
        trackAction(product.id, 'view');
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={`card group relative overflow-hidden flex flex-col h-full cursor-pointer bg-white ${isRecommended ? 'border-primary/50 ring-1 ring-primary/50' : 'border-gray-200'}`}
            onClick={handleClick}
        >
            {isRecommended && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-[#232F3E] text-[10px] font-bold uppercase tracking-wider text-white rounded-bl-lg">
                    Top Pick
                </div>
            )}
            
            <div className="flex-1 space-y-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                   🛍️
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#c7511f] transition-colors line-clamp-2 leading-tight">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                        {product.desc}
                    </p>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-sm bg-gray-100 text-gray-600 border border-gray-200">
                        {product.category}
                    </span>
                    <button 
                        onClick={handleAddToCart}
                        className="btn btn-primary flex items-center justify-center p-2 rounded-lg"
                    >
                        <Plus className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
