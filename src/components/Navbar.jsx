import { ShoppingCart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cart } = useCart();

    return (
        <nav className="sticky top-0 z-50 bg-[#131921] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="flex items-center justify-center">
                            <Zap className="w-8 h-8 text-[#FF9900]" fill="currentColor" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">
                            NeoShop
                        </span>
                    </Link>
                    
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium text-gray-100 hover:text-primary transition-colors">
                            Store
                        </Link>
                        <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-lg transition-colors group">
                            <ShoppingCart className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-black text-[11px] font-bold flex items-center justify-center rounded-full shadow-md">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
