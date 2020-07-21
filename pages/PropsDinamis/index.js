import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

const Story = props => {
    return (
        <View style = {{alignItems : "center", marginRight : 20}}>
            <Image
                source={{ uri: props.gambar }}
                style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
            />

            <Text style={{width: 60, textAlign : "center"}}>
                {props.Nama}
        </Text>    
        </View>
    );
}

const PropsDinamis = () => {
    return (
        <ScrollView horizontal>
            <View style={{ flexDirection: "row" }} >
                <Story Nama="Alfian" gambar="https://yt3.ggpht.com/a-/AOh14GiVJW1-tBrUaJPdWWRn462RRSLTMJihmA5sMnGp9w=s88-c-k-c0xffffffff-no-rj-mo" />
                <Story Nama="Alfian" gambar="https://yt3.ggpht.com/a-/AOh14GiVJW1-tBrUaJPdWWRn462RRSLTMJihmA5sMnGp9w=s88-c-k-c0xffffffff-no-rj-mo" />
                <Story Nama="Alfian" gambar="https://yt3.ggpht.com/a-/AOh14GiVJW1-tBrUaJPdWWRn462RRSLTMJihmA5sMnGp9w=s88-c-k-c0xffffffff-no-rj-mo" />
                <Story Nama="Alfian" gambar="https://yt3.ggpht.com/a-/AOh14GiVJW1-tBrUaJPdWWRn462RRSLTMJihmA5sMnGp9w=s88-c-k-c0xffffffff-no-rj-mo" />
                <Story Nama="Alfian" gambar="https://yt3.ggpht.com/a-/AOh14GiVJW1-tBrUaJPdWWRn462RRSLTMJihmA5sMnGp9w=s88-c-k-c0xffffffff-no-rj-mo" />
                <Story Nama="Alfian" gambar="https://yt3.ggpht.com/a-/AOh14GiVJW1-tBrUaJPdWWRn462RRSLTMJihmA5sMnGp9w=s88-c-k-c0xffffffff-no-rj-mo" />
            </View>
        </ScrollView>
    )
}

export default PropsDinamis

const styles = StyleSheet.create({})

