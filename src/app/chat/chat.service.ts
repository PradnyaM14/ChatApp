import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  //url: string = "http://localhost:6002/api/message"
  url: string = "https://botapp.mybluemix.net/api/message"
  
  constructor(private http:Http) { }
  
  sendMessageWithObservable(message:string): Observable<string[]> {
	console.log("message: "+message)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    let options = new RequestOptions({ headers: headers });
    
    var payload = { workspace_id: "4ad9e7fe-8b34-4506-9281-5b9aed82e9a7",
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
    
    var payload = { workspace_id: "4ad9e7fe-8b34-4506-9281-5b9aed82e9a7",
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
