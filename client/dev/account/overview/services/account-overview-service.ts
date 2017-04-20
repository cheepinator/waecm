import {Inject, Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";

import {Headers, Http} from "@angular/http";

import "rxjs/add/operator/map";

@Injectable()
export class AccountOverviewService {
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
      .get(AccountOverviewService.ENDPOINT, {headers: this.headers})
      .map((r) => r.json());
  }

}
