import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Button
} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS == 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }


    return (
        <View style={styles.product}>
            <View style={styles.touchableContainer}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button color={Colors.primary} title="Details" onPress={props.onViewDetail} />
                            <Button color={Colors.primary} title="Add to Cart" onPress={props.onAddToCart} />
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    detailContainer: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    touchableContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default ProductItem;