const globalEP = "http://172.16.200.56:3000";

export default class endpoint{

    post_login () {
        return globalEP + "/api/v1/login";
    }
    
    post_pushToken() {
        return globalEP + "/api/v1/push.token"
    }
      
    post_register() {
        return globalEP + "/api/v1/users.register"
    }

    get_channelList(){
        return globalEP + "/api/v1/channels.list"
    }

    get_groupList(){
        return globalEP + "/api/v1/groups.list"
    }

    get_historyChat=(roomId)=>{
        console.log(`url getHistory : ${globalEP}/api/v1/groups.history?roomId=${roomId}`);
        return `${globalEP}/api/v1/groups.history?roomId=${roomId}`;
    }
}