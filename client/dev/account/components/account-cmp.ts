import {
  Component,
  OnInit
} from "@angular/core";

import {
  AccountService
} from "../services/account-service";
import {LoginService} from "../../login/services/login-service";
import {Router} from "@angular/router";
import {Account} from "../model/account";
import {Transaction} from "../model/transaction";


@Component({
  selector: "account-cmp",
  templateUrl: "account/templates/account.html",
  styleUrls: ["account/styles/account.css"]
})
export class AccountCmp implements OnInit {
  title: string = "Account";
  account: any;
  transactions: Transaction;

  public ngOnInit():void {
    this._getAccount();
  }

  constructor(private _accountService: AccountService, private _loginService: LoginService, private router: Router) { //


  }
  private _getAccount(): void {
  this._accountService
    .getAccount()
    .subscribe((account) => {
      this.account = account;
      this.transactions = account.transactions;
      return this.account;
    });
  }

  private logout(): void {
    this._loginService.logout();
    this.router.navigate(['/']);
  }

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  // private _getAll(): void {
  //   this._counterService
  //       .getAll()
  //       .subscribe((counters) => {
  //         this.counters = counters;
  //       });
  // }
  //
  // add(message: string): void {
  //   this._counterService
  //       .add(message)
  //       .subscribe((m) => {
  //         this.counters.push(m);
  //         this.counterForm.counterMessage = "";
  //       });
  // }
  //
  // remove(id: string): void {
  //   this._counterService
  //     .remove(id)
  //     .subscribe(() => {
  //       this.counters.forEach((t, i) => {
  //         if (t._id === id)
  //           return this.counters.splice(i, 1);
  //       });
  //     });
  // }
}
