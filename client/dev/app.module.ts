import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule, FormBuilder } from "@angular/forms";
import { BrowserModule  } from "@angular/platform-browser";
import { App }   from "./app";
import { TodoCmp }   from "./todo/components/todo-cmp";
import { todoRouting } from "./todo/components/todo-route";
import { TodoService }   from "./todo/services/todo-service";
import { counterRouting } from "./counter/components/counter-route";
import { CounterService }   from "./counter/services/counter-service";
import {CounterCmp} from "./counter/components/counter-cmp";
import {loginRouting} from "./login/components/login-route";
import {LoginCmp} from "./login/components/login-cmp";
import {LoginService} from "./login/services/login-service";
import {LoggedInGuard} from "./login/services/LoggedInGuard";
import {Router} from "@angular/router";

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      //todoRouting,
      counterRouting,
      loginRouting,
    ],
    declarations: [
      App,
      //TodoCmp,
      CounterCmp,
      LoginCmp,
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

    ],
    bootstrap: [
      App,
    ],
})
export class AppModule {}
