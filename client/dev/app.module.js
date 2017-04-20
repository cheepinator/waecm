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
var animations_1 = require("@angular/platform-browser/animations");
var app_1 = require("./app");
var counter_route_1 = require("./counter/components/counter-route");
var counter_service_1 = require("./counter/services/counter-service");
var counter_cmp_1 = require("./counter/components/counter-cmp");
var account_route_1 = require("./account/components/account-route");
var account_service_1 = require("./account/services/account-service");
var account_cmp_1 = require("./account/components/account-cmp");
var login_route_1 = require("./login/components/login-route");
var login_cmp_1 = require("./login/components/login-cmp");
var login_service_1 = require("./login/services/login-service");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var material_3 = require("@angular/material");
var material_4 = require("@angular/material");
var material_5 = require("@angular/material");
var material_6 = require("@angular/material");
var primeng_1 = require("primeng/primeng");
var material_7 = require("@angular/material");
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
            material_2.MdToolbarModule,
            material_3.MdMenuModule,
            material_4.MdIconModule,
            material_5.MdGridListModule,
            material_6.MdChipsModule,
            primeng_1.DataTableModule,
            primeng_1.SharedModule,
            material_7.MdInputModule,
            //todoRouting,
            counter_route_1.counterRouting,
            login_route_1.loginRouting,
            account_route_1.AccountRouting
        ],
        declarations: [
            app_1.App,
            //TodoCmp,
            counter_cmp_1.CounterCmp,
            login_cmp_1.LoginCmp,
            account_cmp_1.AccountCmp
        ],
        providers: [
            { provide: 'LoggedInGuard',
                useValue: function () {
                    if (localStorage.getItem('currentUser') != null) {
                        return true;
                    }
                    else {
                        location.reload();
                        return false;
                    }
                } },
            //LoggedInGuard,
            //TodoService,
            counter_service_1.CounterService,
            login_service_1.LoginService,
            account_service_1.AccountService
        ],
        bootstrap: [
            app_1.App,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
