import { StyleSheet } from 'react-native';
import Colors from './utils';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const Styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: Colors.buttons,
        padding: 10,
        width: 100,
        margin: 10,
        marginTop: 20,
        borderRadius: 20,
        justifyContent: 'center'
    },
    borderedBox: {
        height: responsiveHeight(100), // 50% of window height
        width: responsiveWidth(100), // 50% of window width,
        borderRadius: 50,
        backgroundColor: Colors.borderedBox,
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: responsiveHeight(10),
    },
    borderedBoxContainer: {
        height: responsiveHeight(100), // 50% of window height
        width: responsiveWidth(100), // 50% of window width,
        borderRadius: 50,
        backgroundColor: Colors.borderedBox,
       // justifyContent: 'flex-start',
        alignItems: 'baseline',
        margin : 20,
        left : responsiveWidth(5)
        //top: responsiveHeight(10),
    },
    container: {
        flex: 2,
        backgroundColor: Colors.container,
        // alignItems: 'center',
        // justifyContent: 'center',
        position : 'absolute'
    },

    labelContainer: { margin: responsiveWidth(responsiveHeight(1)) },

    scrollView: {
        height: '20%',
        width: '80%',
        margin: 20,
        alignSelf: 'center',
        padding: 20,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'lightblue'
    },

    input: {
        width: responsiveWidth(70),
        borderRadius: 300 / 2,
        backgroundColor: Colors.input,
        padding: 15,
        margin: 5,
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: responsiveFontSize(2)
    },

    labelHeader: {
        fontWeight: 'bold',
        fontSize: responsiveFontSize(4.1),
        color: Colors.labelHeader,
        position : 'absolute'
    },

    labelBody: {
        fontWeight: 'bold',
        fontSize: responsiveFontSize(4.1),
        position: 'relative',
        color: Colors.labelBody
    },

    renderItem: { width: responsiveWidth(99), height: 70, padding: 1, borderRadius: 4, backgroundColor: Colors.borderedBox },
    CardMenu: {
        backgroundColor: Colors.cardMenu,
        width: responsiveWidth(5),
        height: responsiveWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        marginTop: 10,
        marginRight: -5
    },

    pictureMenu :{
        width : 50,
        height : 50,
        flex : 1,
        flexDirection : 'row-reverse',
        // marginLeft : 'auto',
        position : 'absolute',
        borderRadius : 50,
        right : 0
    }
});

export default Styles;