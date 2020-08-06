const globalEP = {
    http : "http://172.16.200.56:3000",
    ws:    "ws://172.16.200.56:3000/websocket"
};

export default class endpoint{

    ws_connection () {
        return globalEP.ws;
    }

    ws_rocket_chat_conn () {
        return JSON.stringify({ "msg": "connect", "version": "1", "support": ["1"] });
    }

    ws_rocket_ping() {
        return JSON.stringify({ "msg": "ping" });
    }

    ws_rocket_login_token(authToken) {
        return JSON.stringify({
            "msg": "method",
            "method": "login",
            "id": "42",
            "params": [
                { "resume": "ugFB2VYcrbf3J9ovSdKiLVG9qFD081iWZVyNMEJK9-Q" }
            ]
        })
    }

    post_login () {
        return globalEP.http + "/api/v1/login";
    }
    
    post_pushToken() {
        return globalEP.http + "/api/v1/push.token"
    }
      
    post_register() {
        return globalEP.http + "/api/v1/users.register"
    }

    get_channelList(){
        return globalEP.http + "/api/v1/channels.list"
    }

    get_groupList(){
        return globalEP.http + "/api/v1/groups.list"
    }

    get_historyChat=(roomId)=>{
        console.log(`url getHistory : ${globalEP.http}/api/v1/groups.history?roomId=${roomId}`);
        return `${globalEP.http}/api/v1/groups.history?roomId=${roomId}`;
    }

    post_message=()=>{
        console.log(`url postMessage : ${globalEP.http}/api/v1/chat.sendMessage`);
        return `${globalEP.http}/api/v1/chat.sendMessage`;
    }
}