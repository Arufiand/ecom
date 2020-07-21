import React, {useState} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Cart from '../../komponen/Cart';
import Product from '../../komponen/Product';

const Komunikasi = () => {
    const [totalProduct, setTotalProduct] = useState(0);
    return (
        <View style = {styles.wrapper}>
            <Text style = {styles.textTitle}>Materi Komunikasi Antar Komponen</Text>
            <Cart quantity={totalProduct} />
            <Product onButtonPress = {() => setTotalProduct(totalProduct + 1) } />   
        </View>
    )
}

export default Komunikasi

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    textTitle: {
        textAlign: 'center',
    },
})
