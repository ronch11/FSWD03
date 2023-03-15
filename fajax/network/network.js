import { FXMLhttpRequest } from './fxmlhttprequest.js';
import { server } from './server/server.js'

export class network {
    /**
     * send the reuest to the server.
     * @param {FXMLhttpRequest} the request to the server
     * @returns pass throw the callback function for the return
     */
    static send(FXMLhttpRequest) {
        console.log('network: ',FXMLhttpRequest.method, FXMLhttpRequest.url);
        if (FXMLhttpRequest.url.length < 0) {
            console.log('network: invalid url');
            return;
        }
        if(FXMLhttpRequest.url.split('/')[0] === 'server.com'){
            server.handle(FXMLhttpRequest, function (response){
                console.log('network: responding to client with ', response)
                FXMLhttpRequest.onready_handler(response);
            })
        }
    }
}