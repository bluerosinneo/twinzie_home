//import the axios HTTP client to communicate with the API
import axios from 'axios';

class KwitterService {
    
    constructor(
        url = 'http://localhost:3000/',
        client = axios.create()
    ){
        this.url = url;
        this.client = client;
        this.config = {}
    }

    // exaples of posting

    // var config = {
    //     headers: {'Authorization': "bearer " + token}
    // };
    // var bodyParameters = {
    //    key: "value"
    // }
    // Axios.post( 
    //   'http://localhost:8000/api/v1/get_token_payloads',
    //   bodyParameters,
    //   config
    // ).then((response) => {
    //   console.log(response)
    // }).catch((error) => {
    //   console.log(error)
    // });
    
    // http://localhost:3000/messages?limit=100&offset=0
    getMessages(){
        let limit = "100";
        let offset = "0";
        return this.client.get(this.url + "messages?limit=" + limit + "&offset=" + offset);
    }

    postMessage(text){

        var bodyParameters = {
            "text": text,
        }
        console.log(text);
        console.log(bodyParameters);
        return this.client.post(this.url + "messages", bodyParameters, this.config);
    }

    updatetoken(token){
        this.config = { headers: {'Authorization': "bearer " + token}};                
    }

    // http://localhost:3000/auth/login
    postLogin(username, password){

        var bodyParameters = {
                "username": username,
                "password": password,
        }

        // trying this
        return  this.client.post(this.url + "auth/login", bodyParameters)


        // this is what i wanted 
        // why was this bad
        // this.client.post(this.url + "auth/login", bodyParameters).then( 
        //     (response) => {
        //         console.log("Login Success");

        //         this.config = {
        //                 headers: {'Authorization': "bearer " + response.data.token}
        //             };
        //         return true;
        //     },
        //     (error) => {
        //         console.log(error)
        //         return false;
        //     } 
        // );


    }

}
export default KwitterService;