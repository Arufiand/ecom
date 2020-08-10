import React, { useEffect, useCallback } from 'react';
import { useStore } from '../../App';
import { useState } from 'react';
import endpoint from '../../config/endpoint';

const useTutorial = ({ route }) => {
    const [a, setA] = useState();
    const ep = new endpoint()
    const { authContext, response } = useStore();

    useEffect(() => {

    }, []);

    const ws_rc_login_token = useCallback(() => {
        authContext.onSendRocketChat(ep.ws_rocket_login_token());
        console.log(`berhasil login ndul`);
    },[])

    return [a, ws_rc_login_token];
}



export default useTutorial;