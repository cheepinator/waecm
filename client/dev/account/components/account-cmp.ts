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


@Component({
  selector: "account-cmp",
  templateUrl: "account/templates/account.html",
  styleUrls: ["account/styles/account.css"]
})
export class AccountCmp implements OnInit {
  title: string = "Account";
  account: any;
  transactions: any = [];

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
    });
  }

  private logout(): void {
    this._loginService.logout();
    this.router.navigate(['/']);
  }

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
