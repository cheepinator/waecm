import {
  Component,
  OnInit
} from "@angular/core";

import {LoginService} from "../../login/services/login-service";
import {Router} from "@angular/router";
@Component({
  selector: "account-cmp",
  templateUrl: "account/templates/account.html",
  styleUrls: ["account/styles/account.css"],
})
export class AccountCmp implements OnInit {

  public ngOnInit():void {
  }
  constructor(private _loginService: LoginService, private router: Router) { //
  }

  private logout(): void {
    this._loginService.logout();
    this.router.navigate(['/']);
  }

}
