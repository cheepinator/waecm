import {Component, OnInit} from "@angular/core";

import {LoginService} from "../../login/services/login-service";
import {Router} from "@angular/router";

import {MdSnackBar} from "@angular/material";

import * as io from "socket.io-client";

import * as jwtDecode from "jwt-decode";

@Component({
  selector: "account-cmp",
  templateUrl: "account/templates/account.html",
  styleUrls: ["account/styles/account.css"],
})
export class AccountCmp implements OnInit {

  public username;

  public ngOnInit(): void {
    this.username = jwtDecode(localStorage.getItem('currentUser')).username;
    var socket = io('/', {secure: true});
    //console.log(this.username);
    socket.on(this.username, function (data: any) {
      //console.log(data);
      let snackBarRef = this.snackBar.open("New transaction from ".concat(data.ibanSender).concat(", amount: ").concat(data.value).concat("!"), "Go to transaction", {
        duration: 5000
      });
      snackBarRef.onAction().subscribe(() => {
        console.log('The snack-bar action was triggered!');
      });
    }.bind(this));
  }

  constructor(private _loginService: LoginService, private router: Router, private snackBar: MdSnackBar) { //
  }

  private logout(): void {
    this._loginService.logout();
    this.router.navigate(['/']);
  }


}
