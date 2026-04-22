import { AccountForm, authGuard, AccountDeleteForm, userResolver } from './accounts';
import { Account } from './accounts/account/account';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'signin', title: 'Sing In', component: AccountForm },
      { path: 'signup', title: 'Sing Up', component: AccountForm },
      {
        path: 'account',
        resolve: { user: userResolver },
        runGuardsAndResolvers: 'always',
        children: [
          { path: '', title: 'Account', component: Account },
          { path: 'edit', title: 'Edit Account', component: AccountForm },
          { path: 'delete', title: 'Delete Account', component: AccountDeleteForm },
        ],
      },
    ],
  },
];
