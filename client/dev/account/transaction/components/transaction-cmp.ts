import {
  Component,
  OnInit, Inject
} from "@angular/core";

import {
  TransactionService
} from "../services/transaction-service";
import {Router} from "@angular/router";
import {Transaction} from "../../model/transaction";
import {MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA} from "@angular/material";
//import {NotificationsService} from "angular2-notifications/dist";


@Component({
  selector: "transaction-cmp",
  templateUrl: "account/transaction/templates/transaction.html",
  //template: '<simple-notifications [options]="options"></simple-notifications>',
  styleUrls: ["account/transaction/styles/transaction.css"]
})
export class TransactionCmp implements OnInit {
  title: string = "Transaction";
  transaction: Transaction;
  tan: string;


  public ngOnInit():void {
    this.transaction = new Transaction();
    this.transaction.value = 0;
  }

  constructor(private _transactionService: TransactionService, private router: Router, private  dialog: MdDialog ) { //private _notificationService: NotificationsService


  }

  private generateTan(): void {
    this.transaction.tan = null;
    let config = new MdDialogConfig();
    config.data={data: {transaction:this.transaction}};
    this._transactionService.postTransaction(this.transaction).subscribe(
      transaction  =>
          this.dialog.open(TransactionDialog, config.data),
      error =>  console.log("error: "+error) );//this._notificationService.error('TAN could not be created!'));//console.log("error: "+error) );
  }

  public sendTan(transaction:Transaction, tan:String):void{
    transaction.tan = tan;
    console.log("sending Tan");
    this._transactionService.postTransaction(transaction).subscribe(
      transaction  => console.log("success") );//this._notificationService.success("Transaction successfully sent!"),//console.log("success"),
      error =>  console.log("error: "+error) ;//this._notificationService.error('Wrong TAN entered!'));//console.log("error: "+error) );
    this.dialog.closeAll();

  }

}
@Component({
  selector: 'transaction-dialog',
  providers: [TransactionCmp],
  template: `<h1 md-dialog-title>TAN Input</h1>
    <div md-dialog-content>Please enter the TAN you got by SMS</div>
      <div md-dialog-actions>
      <md-input-container>
      <label>TAN:</label>
      <input mdInput type="text" class="form-control" id="tan" name="tan" [(ngModel)]="tan" required/>
        
      <button md-button (click)="transactionCmp.sendTan(this.data.transaction, this.tan)">Send Tan</button>
      <button md-button (click)="dialogRef.close()">Close</button>
      </md-input-container>
    </div>`
})
export class TransactionDialog {
  constructor(public dialogRef: MdDialogRef<TransactionDialog>, private transactionCmp: TransactionCmp, @Inject(MD_DIALOG_DATA) public data: any) {
  }
}
