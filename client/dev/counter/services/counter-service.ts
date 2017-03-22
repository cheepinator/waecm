import {
  Inject,
  Injectable
} from "@angular/core";

import {
  Observable
} from "rxjs/Observable";

import {
  Http,
  Headers
} from "@angular/http";

import "rxjs/add/operator/map";

@Injectable()
export class CounterService {
  static ENDPOINT: string = "api/counter";

  constructor(@Inject(Http) private _http: Http) {

  }

  getCounter(): Observable<any> {
      return this._http
                 .get(CounterService.ENDPOINT)
                 .map((r) => r.json());
    }

  increaseCounter(): void {
     this._http
      .post(CounterService.ENDPOINT,"{}")
      .subscribe();

  }


  // getAll(): Observable<any> {
  //   return this._http
  //              .get(CounterService.ENDPOINT.replace(/:id/, ""))
  //              .map((r) => r.json());
  // }
  //
  // getById(id: string):Observable<any> {
  //   return this._http
  //              .get(CounterService.ENDPOINT.replace(/:id/, id))
  //              .map((r) => r.json());
  // }
  //
  // add(message: string): Observable<any> {
  //   let _messageStringified = JSON.stringify({counterMessage: message});
  //
  //   let headers = new Headers();
  //
  //   headers.append("Content-Type", "application/json");
  //
  //   return this._http
  //              .post(CounterService.ENDPOINT.replace(/:id/, ""), _messageStringified, {headers})
  //              .map((r) => r.json());
  // }
  //
  // remove(id: string): Observable<any> {
  //   return this._http
  //              .delete(CounterService.ENDPOINT.replace(/:id/, id));
  // }
}
