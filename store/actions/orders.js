export const Add_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch(
            'https://rn-course-17046.firebaseio.com/orders/u1.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString() // can do this on server too
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: Add_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    };
};