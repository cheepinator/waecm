import {Inject, Injectable} from "@angular/core";

import {Observable} from "rxjs/Observable";

import {Headers, Http} from "@angular/http";

import "rxjs/add/operator/map";
import {Transaction} from "../../model/transaction";

@Injectable()
export class TransactionService {
  static ENDPOINT: string = "/api/protected/transactions";
  private headers: Headers;

  constructor(@Inject(Http) private _http: Http) {
//todo injector
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    let currentUser = localStorage.getItem('currentUser');
    this.headers.append('Authorization', 'Bearer ' + currentUser);
  }

  postTransaction(transaction: Transaction): Observable<any> {
    console.log("Send transaction: TO: "+transaction.ibanReceiver+ " Value: "+transaction.value);
    return this._http
      .post(TransactionService.ENDPOINT,transaction, {headers: this.headers})
      .map((r) => r.json());
  }

}
