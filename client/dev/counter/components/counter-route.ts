import {
	Routes,
	RouterModule
} from "@angular/router";

import {
	CounterCmp
} from "../components/counter-cmp";

const counterRoutes:Routes = [
	{
		path: "counter",
		component: CounterCmp,
		pathMatch: "full",
    canActivate: ['LoggedInGuard']
	}
]

export const counterRouting = RouterModule.forRoot(counterRoutes);
