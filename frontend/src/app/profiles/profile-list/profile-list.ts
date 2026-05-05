import { Component, inject, input, OnChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Profiles } from '../profiles';
import { List } from '../../list';

@Component({
  selector: 'app-profile-list',
  imports: [RouterLink, List],
  templateUrl: './profile-list.html',
})
export class ProfileList implements OnChanges {
  readonly q = input('');

  private readonly _router = inject(Router);

  protected readonly profiles = inject(Profiles);

  protected search(value: string) {
    this._router.navigate(['/'], {
      ...(value ? { queryParams: { q: value } } : {}),
      onSameUrlNavigation: 'reload',
      replaceUrl: true,
      scroll: 'manual',
    });
  }

  ngOnChanges() {
    this.profiles.reset();
    this.profiles.searchValue.set(this.q() || '');
    this.profiles.load();
  }
}
