"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var app_1 = require("./app");
var account_route_1 = require("./account/components/account-route");
var account_service_1 = require("./account/services/account-service");
var account_cmp_1 = require("./account/components/account-cmp");
var account_overview_service_1 = require("./account/overview/services/account-overview-service");
var account_overview_cmp_1 = require("./account/overview/components/account-overview-cmp");
var login_route_1 = require("./login/components/login-route");
var login_cmp_1 = require("./login/components/login-cmp");
var login_service_1 = require("./login/services/login-service");
var primeng_1 = require("primeng/primeng");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            [animations_1.BrowserAnimationsModule],
            material_1.MdButtonModule,
            material_1.MdCheckboxModule,
            material_1.MdToolbarModule,
            material_1.MdMenuModule,
            material_1.MdIconModule,
            material_1.MdGridListModule,
            material_1.MdChipsModule,
            primeng_1.DataTableModule,
            primeng_1.SharedModule,
            material_1.MdInputModule,
            login_route_1.loginRouting,
            material_1.MdDialogModule,
            account_route_1.AccountRouting
        ],
        declarations: [
            app_1.App,
            login_cmp_1.LoginCmp,
            account_cmp_1.AccountCmp,
            account_overview_cmp_1.AccountOverviewCmp,
            login_cmp_1.LoginErrorDialog,
        ],
        providers: [
            {
                provide: 'LoggedInGuard',
                useValue: function () {
                    if (localStorage.getItem('currentUser') != null) {
                        return true;
                    }
                    else {
                        location.reload();
                        return false;
                    }
                }
            },
            //LoggedInGuard,
            login_service_1.LoginService,
            account_service_1.AccountService,
            account_overview_service_1.AccountOverviewService
        ],
        bootstrap: [
            app_1.App,
        ],
        entryComponents: [
            login_cmp_1.LoginErrorDialog
        ],
    })
], AppModule);
exports.AppModule = AppModule;
