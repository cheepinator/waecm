import {
	Routes,
	RouterModule
} from "@angular/router";

import {
	AccountCmp
} from "../components/account-cmp";

const accountRoutes:Routes = [
	{
		path: "account",
		component: AccountCmp,
		pathMatch: "full",
    canActivate: ['LoggedInGuard']
	}
]

export const AccountRouting = RouterModule.forRoot(accountRoutes);
