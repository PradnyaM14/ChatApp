import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  //url: string = "http://localhost:6003/api/message"
  url: string = "https://mybotapp.mybluemix.net/api/message"
  
  constructor(private http:Http) { }
  
  sendMessageWithObservable(message:string): Observable<string[]> {
	console.log("message: "+message)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    let options = new RequestOptions({ headers: headers });
    
    var payload = { workspace_id: "4f4e9e5e-6b8a-492f-9bb4-356e92078557",
		context: {},
		input: {"text": message} || {}
	  };
    
    return this.http.post(this.url, payload, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
  }
  
  sendMessageWithPromise(message:string): Promise<string[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    var payload = { workspace_id: "4f4e9e5e-6b8a-492f-9bb4-356e92078557",
		context: {},
		input: {"text": message} || {}
	  };
    
    return this.http.post(this.url, payload, options).toPromise()
           .then(this.extractData)
           .catch(this.handleErrorPromise);
  }
  
  private extractData(res: Response) {
	let body = res.json();
    console.log(body.output.text);
        return body.output.text || [];
  }
    
  private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
  }
  
  private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
  }	

}
