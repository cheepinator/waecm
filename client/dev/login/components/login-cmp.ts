import {
  Component,
  OnInit
} from "@angular/core";

import {
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";

import {
  LoginService
} from "../services/login-service";
import {Router} from "@angular/router";

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

  constructor(private _loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  login(username: string, password: string){
    console.log("login cmp");
    this._loginService.login(username, password).subscribe(
      data => {
        this.router.navigate(["account"]);
      },
      error => {
        console.log("An error ocurred: "+error)
      });
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
}
