import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../accounts.types';

@Component({
  selector: 'app-account',
  imports: [RouterLink],
  templateUrl: './account.html',
})
export class Account {
  readonly user = input.required<User>();
}
