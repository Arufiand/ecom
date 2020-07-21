import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Product from './komponen/Product';
import Cart from './komponen/Cart';

const EcomScreen = () => {
    const [totalProduct, setTotalProduct] = useState(0);
    return (
        <View style={styles.wrapper}>
            <ScrollView>
                <Text style={styles.textTitle}>Materi Komunikasi Antar Komponen</Text>
                <Cart quantity={totalProduct} />
                <Product onButtonPress={() => setTotalProduct(totalProduct + 1)} />
            </ScrollView>
        </View>
    )
}

export default EcomScreen

const styles = StyleSheet.create({})
