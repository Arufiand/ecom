import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import ROG from '../../../img/produk1.png';

const ECom = (props) => {
    return (
        <View
            style={styleP.wrapper}>
            <Image
                source={ROG}
                style={styleP.Product}
            />
            <Text style={styleP.textProduct}>
                {props.text1}
            </Text>
            <Text style={styleP.textProduct}>
                {props.text2}
            </Text>
            <Text style={styleP.textProduct}>
                {props.text3}
            </Text>
            <TouchableOpacity onPress={props.onPressCom}>
                <View style={styleP.buttonWrapper}>
                    <Text style={styleP.buttonText}>BELI</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Product = (props) => {
    return (
        <View>
            <ECom text1="ASUS 2020" text2="Rp2000000" text3="Dijual di ID" onPressCom = {props.onButtonPress}/>
            <ECom text1="ASUS 2021" text2="Rp2000000" text3="Dijual di ID" onPressCom = {props.onButtonPress}/>
            <ECom text1="ASUS 2020" text2="Rp2000000" text3="Dijual di ID" onPressCom = {props.onButtonPress}/>
        </View>
    )
}

export default Product

{/* props ini digunakan untuk mengganti variabel */ }

const styleP = StyleSheet.create({
    Product : {width: 188,height: 107,borderRadius: 8,},
    textProduct : { fontSize: 14, fontWeight: 'bold', marginTop: 16 },
    wrapper : {padding: 15,backgroundColor: '#F2F2F2',borderRadius: 8,margin: 20,},
    buttonWrapper : {backgroundColor : '#6FCF97', paddingVertical : 6, borderRadius : 25, marginTop : 20},
    buttonText : {fontSize : 14, fontWeight : '600', color : 'white', textAlign : 'center',}
})
