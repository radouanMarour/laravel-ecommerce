import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/cart/get');
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (productId, quantity) => {
        try {
            const response = await axios.post('/cart/add', { product_id: productId, quantity });
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await axios.put('/cart/update', { product_id: productId, quantity });
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete('/cart/remove', { data: { product_id: productId } });
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            const response = await axios.post('/cart/clear');
            setCart(response.data.cart);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const value = {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

