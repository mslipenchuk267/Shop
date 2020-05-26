import React, { useEffect, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === 'FORM_INPUT_UPDATE') {
        const updatedValues = {
            ...state.inputValues,
            [action.inputId]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.inputId]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            // if at least on of the form validities is invalid, 
            //  the formIsValid will be false
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        };
    }
    return state;
};

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(
        prod => prod.id === prodId)
    );

    const dispatch = useDispatch();


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    })

    const textChangeHandler = (inputId, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            inputId: inputId
        })
    };

    // useCallback ensures this function is recreated each time the component re-renders
    // This way we avoid entering into an infinite loop of it getting called
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid Input', 'Please check the form', [{ text: 'Okay' }])
            return;
        }

        if (editedProduct) {
            dispatch(productsActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            // doing +price sets the string to a number
            dispatch(productsActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form} >
                <View style={styles.formControl} >
                    <Text style={styles.label} >Title</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title</Text>}
                </View>
                <View style={styles.formControl} >
                    <Text style={styles.label} >Image Url</Text>
                    <TextInput style={styles.input}
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                    />
                </View>
                {editedProduct ? null :
                    <View style={styles.formControl} >
                        <Text style={styles.label} >Price</Text>
                        <TextInput style={styles.input}
                            style={styles.input}
                            value={formState.inputValues.price}
                            onChangeText={textChangeHandler.bind(this, 'price')}
                            keyboardType='decimal-pad'
                        />
                    </View>}
                <View style={styles.formControl} >
                    <Text style={styles.label} >Description</Text>
                    <TextInput style={styles.input}
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFunc = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight:
            (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item
                        title='Save'
                        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={submitFunc}
                    />
                </HeaderButtons>
            ),
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;