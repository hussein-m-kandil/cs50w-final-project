import { Component, inject, input, OnChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Profiles } from '../profiles';
import { List } from '../../list';

@Component({
  selector: 'app-profile-list',
  imports: [List, RouterLink],
  templateUrl: './profile-list.html',
})
export class ProfileList implements OnChanges {
  readonly q = input('');

  private readonly _router = inject(Router);

  protected readonly profiles = inject(Profiles);

  protected search(value: string) {
    const navigationOptions = { replaceUrl: true, onSameUrlNavigation: 'reload' } as const;
    if (value) {
      this._router.navigate(['/'], { ...navigationOptions, queryParams: { q: value } });
    } else {
      this._router.navigate(['/'], navigationOptions);
    }
  }

  ngOnChanges() {
    this.profiles.reset();
    this.profiles.searchValue.set(this.q() || '');
    this.profiles.load();
  }
}
