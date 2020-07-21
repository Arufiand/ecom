// penggunaan component biasa
import React, {
    Component
} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native';

export const SampleBaru = () => {
  return ( 
    <View>
    <View style = {
      {
        width: 80,
        height: 80,
        backgroundColor: '#48dbfb'
      }
    }
    />      
    <Text style={styles.text}> Alfian </Text>  
    <Alfian />
    <Text style={styles.text}> Danny </Text>  
    <Foto />
    <TextInput style = {
      {
        borderWidth: 1
      }
    }

    />  
    <BoxGreen />
    <Hewan />
    </View>
  );
}

// penggunaan component biasa
export const Alfian = () => {
  return <Text style={styles.text}> S1 Sistem Informasi </Text>;
};

export const StylingBaru = () => {
  return (
    <View>
      <Text style={styles.text}>Styling Component</Text>
      <View 
        style = {{
          width : 100,
          height : 100,
          backgroundColor : '#0abde3',
          borderWidth : 2,
          borderColor : '#6f27cd',
          marginTop : 20,
          marginLeft : 20,
        }}
      />
    </View>
  );
}
export const Foto = () => {
  return ( 
    <Image source = {
      {
        uri: 'http://placeimg.com/100/100/arch'
      }
    }
    style = {
      {
        width: 100,
        height: 100
      }
    }
    />
  );
};


//penggunaan component react

export class BoxGreen extends Component {
  render(){
    return <Text style={styles.text}>Ini Component Dari Class</Text>
  }
}

export class Hewan extends Component {
  render(){
    return (
      <View>
        <Image 
        source= {{uri:'http://placeimg.com/100/100/animals'}}
        style = {{width: 100, height: 100,marginLeft : 20, borderRadius: 50}}
        />
        <Text style = {{fontSize : 24, color : 'blue'}} >ini foto hewan</Text>
      </View>
    );
  }
}

  
  //styling basic\
export const styles = StyleSheet.create({
      text: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#10ac84',
          marginLeft: 20,
          marginTop: 40,
      }
  });
const Styling = () => {
    return (<View>
      <SampleBaru />
      <Alfian />
      <Foto/>

    </View>);
}

export default Styling;