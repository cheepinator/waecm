import {Inject, Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";

import {Headers, Http} from "@angular/http";

import "rxjs/add/operator/map";
import {Account} from "../model/account";

@Injectable()
export class AccountService {
  static ENDPOINT: string = "/api/protected/account";
  private headers: Headers;

  constructor(@Inject(Http) private _http: Http) {
//todo injector
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    let currentUser = localStorage.getItem('currentUser');
    this.headers.append('Authorization', 'Bearer ' + currentUser);
  }

  getAccount(): Observable<any> {
    return this._http
      .get(AccountService.ENDPOINT, {headers: this.headers})
      .map((r) => r.json());
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
