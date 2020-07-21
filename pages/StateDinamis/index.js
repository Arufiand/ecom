import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'



const Hitung = () => {
    const [number, setNumber] = useState (0); 
    
    useEffect(() => {
        // //did mount
        // console.log('Nilai Awal');
        return () => {
            //did update
            console.log(number);
        };
    }, [number]);
  

    return (
        <View>
            <Text style={styles.numbers}>{number}</Text>
            <Button title="Tambah" 
            onPress ={() =>
            setNumber(number + 1) 
            }
            />
        </View>
    )


}

const StateDinamis = () => {
    return (
        <View style = {styles.wrapper}>
            <Text style = {styles.textTitle}>
                Belajar Komponen dinamis state
            </Text>
            <Hitung />
        </View>
    );
}

export default StateDinamis

const styles = StyleSheet.create({
    wrapper : {
        padding : 20,
    },
    textTitle : {
        textAlign : 'center',
    },
    numbers : {
        fontSize : 14,
    }
});