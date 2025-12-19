import axios from 'axios';

const productUrl = import.meta.env.VITE_PRODUCT_API_URL;
const recommendUrl = import.meta.env.VITE_RECOMMEND_API_URL;

if (!productUrl) {
    console.error("CRITICAL: VITE_PRODUCT_API_URL is not defined in your .env file!");
}
if (!recommendUrl) {
    console.error("CRITICAL: VITE_RECOMMEND_API_URL is not defined in your .env file!");
}

// API instance for Products
const productApi = axios.create({
    baseURL: productUrl ? productUrl.replace(/\/$/, '') : undefined,
    headers: { 'Content-Type': 'application/json' }
});

// API instance for Recommendations
const recommendApi = axios.create({
    baseURL: recommendUrl ? recommendUrl.replace(/\/$/, '') : undefined,
    headers: { 'Content-Type': 'application/json' }
});

console.log('Product API URL:', productApi.defaults.baseURL);
console.log('Recommend API URL:', recommendApi.defaults.baseURL);

export const getProducts = async () => {
    const response = await productApi.get('/products');
    return response.data;
};

export const getRecommendations = async (history) => {
    const response = await recommendApi.post('/recommend', { history });
    return response.data;
};

export default { productApi, recommendApi };
