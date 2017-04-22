import {
	Routes,
	RouterModule
} from "@angular/router";

import {
	AccountCmp
} from "./account-cmp";

import {AccountOverviewCmp} from "../overview/components/account-overview-cmp"
import {TransactionCmp} from "../transaction/components/transaction-cmp";

const accountRoutes:Routes = [
	{
		path: "account",
		component: AccountCmp,
    canActivate: ['LoggedInGuard'],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: AccountOverviewCmp},
      { path: 'transaction', component: TransactionCmp}
    ]

	}
];

export const AccountRouting = RouterModule.forChild(accountRoutes);
