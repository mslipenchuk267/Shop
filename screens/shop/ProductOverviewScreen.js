import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';


const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)


    return (
        <FlatList
            data={products}
            // keyExtractor={item => item.id} for older react native version
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
    );
};

ProductsOverViewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductsOverViewScreen;