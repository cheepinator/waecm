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
var app_1 = require("./app");
var todo_cmp_1 = require("./todo/components/todo-cmp");
var todo_route_1 = require("./todo/components/todo-route");
var todo_service_1 = require("./todo/services/todo-service");
var counter_route_1 = require("./counter/components/counter-route");
var counter_service_1 = require("./counter/services/counter-service");
var counter_cmp_1 = require("./counter/components/counter-cmp");
var login_route_1 = require("./login/components/login-route");
var login_cmp_1 = require("./login/components/login-cmp");
var login_service_1 = require("./login/services/login-service");
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
            todo_route_1.todoRouting,
            counter_route_1.counterRouting,
            login_route_1.loginRouting,
        ],
        declarations: [
            app_1.App,
            todo_cmp_1.TodoCmp,
            counter_cmp_1.CounterCmp,
            login_cmp_1.LoginCmp,
        ],
        providers: [
            todo_service_1.TodoService,
            counter_service_1.CounterService,
            login_service_1.LoginService,
        ],
        bootstrap: [
            app_1.App,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
