import {
  Inject,
  Injectable
} from "@angular/core";

import {
  Observable
} from "rxjs/Observable";

import {
  Http,
  Headers,
  Response
} from "@angular/http";

import "rxjs/add/operator/map";

@Injectable()
export class LoginService {
  static ENDPOINT: string = "/api/token";

  constructor(@Inject(Http) private _http: Http) {

  }


  login(username: string, password: string): Observable<any> {
    let _messageStringified = JSON.stringify({username: username, password: password});

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    return this._http
      .post(LoginService.ENDPOINT, _messageStringified, {headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.id_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', user.id_token);
          //console.log("setting local storage: currentUser: "+ user.id_token);
        }
      });
  }

  logout(): void{
    localStorage.setItem('currentUser', null);
  }

}
