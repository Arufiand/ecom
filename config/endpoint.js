const globalEP = "http://172.16.2.20";

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
}