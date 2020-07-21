import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

var Style = StyleSheet.create ({
    rootContainer: {
        flex : 1
    },

    displayContainer : {
        flex: 2,
        backgroundColor : '#193441'
    },

    inputContainer: {
        flex: 8,
        backgroundColor : '#3E606F'
    },

    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    inputButtonText: {
        fontSize:22,
        fontWeight: 'bold',
        color: 'white'
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    },

    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    },

    button: {
        marginTop: 10,
    },

    buttonContainer: {
        width: width / 2,
        height: height / 15,
    },

    loginContainer:{
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    titleText: {
        fontSize: 24,
        marginBottom: 10
    },

    loginButtonLabel: {
        fontSize: 22
    },

    navButtonText: {
        fontSize: 16
    },
    navButton: {
        marginTop: 10
    },
});

export default Style;