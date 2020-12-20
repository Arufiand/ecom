import { StyleSheet } from 'react-native';
import Colors from './utils';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
    useResponsiveScreenHeight,
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
        flex : 1,
        height: responsiveHeight(100), // 50% of window height
        width: responsiveWidth(90), // 50% of window width,
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
        fontSize: responsiveFontSize(3.5),
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



    page : {
         flex : 3,
         backgroundColor : Colors.violet
        
    },
    firstCard : {
        flex : 1,
        width : responsiveScreenWidth(100),
        height: responsiveScreenHeight(100),
        borderRadius: 40,
        backgroundColor : Colors.softWhite,
        top: responsiveHeight(15),
        alignItems: 'baseline',
    },
    secondCard : {
        flex : 20,
        width : responsiveScreenWidth(100),
        height: responsiveScreenHeight(100),
        borderRadius: 40,
        backgroundColor : Colors.lightBlue,
        // top: responsiveHeight(20),
        alignItems: 'baseline',
        
    },
    cardLabelHeader : {
        marginLeft : responsiveWidth(9),
        top : responsiveHeight(3),
        fontWeight: 'bold',
        fontSize: responsiveFontSize(4.1),
        color: Colors.violet,
    },
    mainLabelHeader : {
        marginLeft : responsiveWidth(9),
        top : responsiveHeight(3),
        fontWeight: 'bold',
        fontSize: responsiveFontSize(4.1),
        color: Colors.softWhite,
    },
    displayPictureIcon :{
        width : 50,
        height : 50,
        marginTop : responsiveScreenHeight(2),
        position : 'absolute',
        borderRadius : 50/2,
    },

    pictureMenu :{
        width : 60,
        height : 60,
        position : 'relative',
        borderRadius : 70/2,
        marginTop : responsiveScreenHeight(4),
        marginRight : responsiveWidth(4)
    },
});

export default Styles;