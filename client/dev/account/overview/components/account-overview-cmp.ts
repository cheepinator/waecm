import {
  Component,
  OnInit
} from "@angular/core";

import {
  AccountOverviewService
} from "../services/account-overview-service";
import {Router} from "@angular/router";
import {Account} from "../../model/account";
import {Transaction} from "../../model/transaction";
import {OverlayPanel} from "primeng/components/overlaypanel/overlaypanel";
import * as jwtDecode from "jwt-decode";

@Component({
  selector: "account-overview-cmp",
  templateUrl: "account/overview/templates/account-overview.html",
  styleUrls: ["account/overview/styles/account-overview.css"]
})
export class AccountOverviewCmp implements OnInit {
  title: string = "Account";
  account: any;
  transactions: [Transaction];
  selectedTransaction: Transaction;
  public firstName;

  public ngOnInit():void {
    this._getAccount();
    this.firstName = jwtDecode(localStorage.getItem('currentUser')).firstName;
  }

  constructor(private _accountService: AccountOverviewService, private router: Router) { //


  }
  private _getAccount(): void {
  this._accountService
    .getAccount()
    .subscribe((account) => {
      this.account = account;
      this.transactions = account.transactions;
    },
      error =>  console.log(error));
  }

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  selectDetails(event, t: Transaction, overlaypanel: OverlayPanel) {
    this.selectedTransaction = t;
    overlaypanel.toggle(event);
  }
}
