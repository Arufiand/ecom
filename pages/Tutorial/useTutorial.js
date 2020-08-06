import Endpoint from '../../config/endpoint';

const useTutorial = ({ route }) => {
    const ep = new Endpoint();
    const ws = new WebSocket(ep.ws_connection())   

    const ws_open = () => {
        ws.onopen = () => {
            ws.send(ep.ws_rocket_chat_conn());
            console.log(`socket connected!`);
        }
    }

    const ws_close = () => {
        ws.onclose = () => {
            console.log(`Socket Disconected!`);
            try {
                ws_open()
            } catch (error) {
                console.log(error);
            }
        }
    }

    const ws_onMessage = () => {
        ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            console.log(`ini isi message ${JSON.stringify(message)}`);
            if (message.msg == "ping") {
                ws.send(ep.ws_rocket_ping())
            }
            if (message.msg == "connected"){
                ws.send(ep.ws_rocket_login_token()) 
            }
            if (message.msg == "updated"){
                
            }
            
        }
    }



    return [ws_open, ws_onMessage, ws_close];
}



export default useTutorial;