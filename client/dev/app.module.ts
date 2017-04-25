import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormBuilder, FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {
  MaterialModule,
  MdButtonModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdToolbarModule,
  MdSnackBarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {App} from "./app";
import {AccountRouting} from "./account/components/account-route";
import {AccountService} from "./account/services/account-service";
import {AccountCmp} from "./account/components/account-cmp";
import {AccountOverviewService} from "./account/overview/services/account-overview-service";
import {AccountOverviewCmp} from "./account/overview/components/account-overview-cmp";
import {TransactionCmp, TransactionDialog} from "./account/transaction/components/transaction-cmp";
import {loginRouting} from "./login/components/login-route";
import {LoginCmp, LoginErrorDialog} from "./login/components/login-cmp";
import {LoginService} from "./login/services/login-service";
import {LoggedInGuard} from "./login/services/LoggedInGuard";
import {DataTableModule, SharedModule} from "primeng/primeng";
import {Router} from "@angular/router";
import {TransactionService} from "./account/transaction/services/transaction-service";
import {OverlayPanelModule} from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    [BrowserAnimationsModule],
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdMenuModule,
    MdIconModule,
    MdGridListModule,
    MdChipsModule,
    DataTableModule,
    SharedModule,
    MdInputModule,
    loginRouting,
    MdDialogModule,
    AccountRouting,
    OverlayPanelModule
  ],
  declarations: [
    App,
    LoginCmp,
    AccountCmp,
    AccountOverviewCmp,
    TransactionCmp,
    LoginErrorDialog,
    TransactionDialog,

  ],
  providers: [
    {
      provide: 'LoggedInGuard',
      useValue: () => {
        if (localStorage.getItem('currentUser') != null) {
          return true
        }
        else {
          location.reload();
          return false;
        }
      }
    },
    //LoggedInGuard,
    LoginService,
    AccountService,
    AccountOverviewService,
    TransactionService,

  ],
  bootstrap: [
    App,
  ],
  entryComponents: [
    LoginErrorDialog,
    TransactionDialog
  ],
})
export class AppModule {
}
