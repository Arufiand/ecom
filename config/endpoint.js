const globalEP = {
    //RocketChat Schadenfreude
    //http: "http://172.25.119.8:3000",
    //ws:   "ws://172.25.119.8:3000/websocket"

    // //RocketChat Kantor
    // //saat url menggunakan WSL (https), untuk websocket wajib gunakan wss, bukan ws
    // http    :"https://chat.sby.clouds.id",
    // ws      :"wss://chat.sby.clouds.id/websocket",

    
};

export default class endpoint{

    ws_connection () {
        return globalEP.ws;
    }

    ws_rocket_chat_conn () {
        return JSON.stringify({ "msg": "connect", "version": "1", "support": ["1"] });
    }

    ws_rocket_login_token(authToken) {
        return JSON.stringify({
            "msg": "method",
            "method": "login",
            "id": "42",
            "params": [
                { "resume": authToken }
            ]
        })
    }

    ws_rocket_ping() {
        return JSON.stringify({ "msg": "ping" });
    }

    ws_rocket_stream_notify_room (roomId) {
        return JSON.stringify({
            "msg": "sub",
            "id": "unique-id",
            "name": "stream-notify-room",
            "params": [
                `${roomId}/typing`, true
            ]
        })
    }

    ws_rocket_stream_room_message(randomId, roomId) {
        return JSON.stringify({
            "msg": "sub",
            "id": randomId,
            "name": "stream-room-messages",
            "params": [
                roomId, false
            ]
        })
    }

    ws_rocket_stream_notify_user(userId, event) {
        return JSON.stringify({
            "msg": "sub",
            "id": "unique-id",
            "name": "stream-notify-user",
            "params": [
                `${userId}/${event}`,
                true
            ]
        })
    }

    ws_rocket_load_history(room_id, gettime_start, gettime_end, count_load_message) {
        return JSON.stringify({
            "msg": "method",
            "method": "loadHistory",
            "id": "42",
            "params": [room_id, { "$date": gettime_start }, count_load_message, { "$date": gettime_end }]
        });
    }

    ws_rocket_load_lastest_history(roomId) {
        return JSON.stringify({
            "msg": "method",
            "method": "loadHistory",
            "id": "42",
            "params": [roomId, null, 10, { "$date": 1480377601 }]
        });
    } 

    ws_rocket_send_message(roomId, message, messageId) {
        return JSON.stringify({
            "msg": "method",
            "method": "sendMessage",
            "id": "42",
            "params": [
                {
                    "_id": messageId, //roomId+userId+dateNow
                    "rid": roomId,
                    "msg": message
                }
            ]
        })
    }

    ws_create_direct_message(username) {
        return JSON.stringify({
            "msg": "method",
            "method": "createDirectMessage",
            "id": "42",
            "params": [username]
        })
    }



    post_login () {
        return globalEP.http + "/api/v1/login";
    }

    post_logout () {
        return globalEP.http + "/api/v1/logout";
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

    get_usersList = () => {
        console.log(`url getHistory : ${globalEP.http}/api/v1/users.list`);
        return `${globalEP.http}/api/v1/users.list`;
    }

    get_historyChat=(roomId)=>{
        console.log(`url getHistory : ${globalEP.http}/api/v1/groups.history?roomId=${roomId}`);
        return `${globalEP.http}/api/v1/groups.history?roomId=${roomId}`;
    }

    post_message=()=>{
        console.log(`url postMessage : ${globalEP.http}/api/v1/chat.sendMessage`);
        return `${globalEP.http}/api/v1/chat.sendMessage`;
    }

    get_mentioned_chat = (roomId) => {
        console.log(`url getMentionedMessage : ${globalEP.http}/api/v1/chat.getMentionedMessages?roomId=${roomId}`);
        return `${globalEP.http}/api/v1/chat.getMentionedMessages?roomId=${roomId}`
    }

    get_avatar = (subject) => {
        return `http://172.16.200.56:3000/avatar/munirjb_gmail_com?size=50`
    }

    get_im_history_chat = (roomId) => {
        return `${globalEP.http}/api/v1/im.history?roomId=${roomId}`

    }
}
