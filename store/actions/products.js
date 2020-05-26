import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {



    return async dispatch => {
        // since we are returning a dispatch function,
        // execute any async code you want! becuase redux-thunk will know what to do
        // fetch returns a promise
        const response = await fetch('https://rn-course-17046.firebaseio.com/products.json');

        const resData = await response.json();
        const loadedProducts = [];
        for (const key in resData) {
            loadedProducts.push(new Product(
                key, 
                'u1', 
                resData[key].title, 
                resData[key].imageUrl, 
                resData[key].description, 
                resData[key].price
            ));
        }

        dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    }
};

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // since we are returning a dispatch function,
        // execute any async code you want! becuase redux-thunk will know what to do
        // fetch returns a promise
        const response = await fetch('https://rn-course-17046.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const resData = await response.json();
        // this only gets dispatched once the above operations are done.
        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                // title: title,
                // description: description,
                // imageUrl: imageUrl,
                // price: price
                // below is the same as above
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        });
    };

    
};

export const updateProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            // title: title,
            // description: description,
            // imageUrl: imageUrl,
            // below is the same as above
            title,
            description,
            imageUrl
        }
    };
};