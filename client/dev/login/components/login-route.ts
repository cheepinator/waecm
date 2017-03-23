import {
	Routes,
	RouterModule
} from "@angular/router";

import {
	LoginCmp
} from "../components/login-cmp";

const loginRoutes:Routes = [
	{
		path: "login",
		component: LoginCmp,
		pathMatch: "full"
	}
]

export const loginRouting = RouterModule.forRoot(loginRoutes);
