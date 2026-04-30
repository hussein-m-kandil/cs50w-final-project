import {
  authGuard,
  AccountForm,
  userResolver,
  AccountDeleteForm,
  optionalUserResolver,
} from './accounts';
import { Profile, profileResolver, CreateProfile, ProfileList } from './profiles';
import { Account } from './accounts/account/account';
import { Routes } from '@angular/router';
import { NotFound } from './not-found';

export const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    resolve: { user: optionalUserResolver },
    children: [
      { path: '', component: ProfileList },
      { path: 'not-found', title: '404 Not Found', component: NotFound },
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
      {
        path: 'create',
        title: 'Create Profile',
        component: CreateProfile,
      },
      {
        path: ':profileId',
        title: 'Profile',
        component: Profile,
        runGuardsAndResolvers: 'always',
        resolve: { profile: profileResolver },
      },
    ],
  },
];
