import {Component, OnInit} from "@angular/core";

import {FormControl, FormGroup, Validators} from "@angular/forms";

import {LoginService} from "../services/login-service";
import {Router} from "@angular/router";
import {MdDialog, MdDialogRef} from "@angular/material";

type Login = {
  loginMessage: string;
  _id?: string;
};

@Component({
  selector: "login-cmp",
  templateUrl: "login/templates/login.html",
  styleUrls: ["login/styles/login.css"]
})
export class LoginCmp implements OnInit {
  title: string = "StodtRadl";
  logins: Login[] = [];
  loginForm: Login;

  constructor(private _loginService: LoginService, private router: Router, private  dialog: MdDialog) {
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    console.log("login cmp");
    this._loginService.login(username, password).subscribe(
      data => {
        this.router.navigate(["account"]);
      },
      error => {
        let dialogRef = this.dialog.open(LoginErrorDialog);
        console.log("An error ocurred: " + error)
      });
  }


}
@Component({
  selector: 'login-error-dialog',
  template: `<h1 md-dialog-title>Error</h1>
    <div md-dialog-content>Username or Password do not match!</div>
      <div md-dialog-actions>
      <button md-button (click)="dialogRef.close()">Ok</button>
    </div>`
})
export class LoginErrorDialog {
  constructor(public dialogRef: MdDialogRef<LoginErrorDialog>) {
  }
}


  // private _getAll(): void {
  //   this._loginService
  //       .getAll()
  //       .subscribe((logins) => {
  //         this.logins = logins;
  //       });
  // }
  //
  // add(message: string): void {
  //   this._loginService
  //       .add(message)
  //       .subscribe((m) => {
  //         this.logins.push(m);
  //         this.loginForm.loginMessage = "";
  //       });
  // }
  //
  // remove(id: string): void {
  //   this._loginService
  //     .remove(id)
  //     .subscribe(() => {
  //       this.logins.forEach((t, i) => {
  //         if (t._id === id)
  //           return this.logins.splice(i, 1);
  //       });
  //     });
  // }
