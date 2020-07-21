import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './Routes';


const Provider = () => {
    return (
        <PaperProvider>
            <Routes />
        </PaperProvider>
    )
}

export default Provider
