import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
@Injectable()

export class LoggedInGuard implements CanActivate {


  constructor(private router: Router) {

  }

  canActivate() {
    if (localStorage.getItem('currentUser') != null) {
      this.router.navigate(['/counter']);
      return true;
    }
    else {
      this.router.navigate(['']);
    }
    return false;
  }
}
