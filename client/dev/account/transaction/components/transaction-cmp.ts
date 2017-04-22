import {
  Component,
  OnInit
} from "@angular/core";

import {
  TransactionService
} from "../services/transaction-service";
import {Router} from "@angular/router";
import {Transaction} from "../../model/transaction";


@Component({
  selector: "transaction-cmp",
  templateUrl: "account/transaction/templates/transaction.html",
  styleUrls: ["account/transaction/styles/transaction.css"]
})
export class TransactionCmp implements OnInit {
  title: string = "Transaction";
  transaction: Transaction;


  public ngOnInit():void {
    this.transaction = new Transaction();
    this.transaction.value = 0;
  }

  constructor(private _transactionService: TransactionService, private router: Router) { //


  }

  // private _getTransaction(): void {
  // this._transactionService
  //   .getTransaction()
  //   .subscribe((transaction) => {
  //     this.transaction = transaction;
  //     this.transactions = transaction.transactions;
  //   },
  //     error =>  console.log(error));
  // }

  private executeTransaction(): void {
    this._transactionService.postTransaction(this.transaction).subscribe(
      transaction  => console.log("Transaction persisted"),
      error =>  console.log("error: "+error) );
    //TODO check if post succeeded?
    //return true;
  }


}
