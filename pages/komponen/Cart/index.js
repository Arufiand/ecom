import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import cart from '../../../img/cart.png';

const Cart = (props) => {
    return (
        <View>
            <View style={stylesC.wrapper}>
                <View style={stylesC.cartWrapper}>
                    <Image source={cart} style={stylesC.iconCart} />
                    <Text style={stylesC.notifikator}>
                        {props.quantity}
                    </Text>
                </View>
                <Text style={stylesC.text}>
                    Keranjang Belanja Anda
                    </Text>
                <Text>
                    Silahkan belanja Lagi
                    </Text>
            </View>
        </View>
    )
}

export default Cart

const stylesC = StyleSheet.create({
    iconCart: {
        width: 50,
        height: 50
    },
    wrapper: {
        padding: 20,
        alignItems: 'center'
    },
    wrapper: {
        padding: 20,
        alignItems: 'center'
    },
    cartWrapper: {
        borderWidth: 1,
        borderColor: 'black',
        width: 93,
        height: 93,
        borderRadius: 93 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    },
    notifikator: {
        fontSize: 12,
        color: 'black',
        backgroundColor: '#6FCF67',
        padding: 4,
        borderRadius: 25,
        width: 24,
        height: 24,
        position: 'absolute',
        top: 0,
        right: 0
    },
})
