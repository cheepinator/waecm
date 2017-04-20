import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule, FormBuilder } from "@angular/forms";
import { BrowserModule  } from "@angular/platform-browser";
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { App }   from "./app";
import { TodoCmp }   from "./todo/components/todo-cmp";
import { todoRouting } from "./todo/components/todo-route";
import { TodoService }   from "./todo/services/todo-service";
import { counterRouting } from "./counter/components/counter-route";
import { CounterService }   from "./counter/services/counter-service";
import {CounterCmp} from "./counter/components/counter-cmp";
import { AccountRouting } from "./account/components/account-route";
import { AccountService }   from "./account/services/account-service";
import {AccountCmp} from "./account/components/account-cmp";
import {loginRouting} from "./login/components/login-route";
import {LoginCmp} from "./login/components/login-cmp";
import {LoginService} from "./login/services/login-service";
import {LoggedInGuard} from "./login/services/LoggedInGuard";
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {Router} from "@angular/router";

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      [BrowserAnimationsModule],
      MdButtonModule,
      MdCheckboxModule,
      MdToolbarModule,
      MdMenuModule,
      MdIconModule,
      //todoRouting,
      counterRouting,
      loginRouting,
      AccountRouting
    ],
    declarations: [
      App,
      //TodoCmp,
      CounterCmp,
      LoginCmp,
      AccountCmp
    ],
    providers: [
      {provide: 'LoggedInGuard',
        useValue: () => {
          if (localStorage.getItem('currentUser') != null) {
            return true
          }
          else{
            location.reload();
            return false;
          }
      }},
      //LoggedInGuard,
      //TodoService,
      CounterService,
      LoginService,
      AccountService

    ],
    bootstrap: [
      App,
    ],
})
export class AppModule {}
