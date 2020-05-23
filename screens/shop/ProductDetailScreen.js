import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';

import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    // Select a single product based on the productId we passed here as a navigation param
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    );


    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.action} >
                <Button color={Colors.primary} title="Add to Cart" onPress={() => { }} />
            </View>
            <Text style={styles.price} >${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description} >{selectedProduct.description}</Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    action: {
        marginVertical: 10,
        alignItems: 'center'
    },  
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetailScreen;