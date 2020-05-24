export const Add_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return { 
        type: Add_ORDER, 
        orderData: { items: cartItems, amount: totalAmount } 
    };
};