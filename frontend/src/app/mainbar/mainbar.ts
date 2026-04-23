import { Component, computed, inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ColorScheme, SCHEMES } from '../color-scheme';
import { ButtonDirective } from 'primeng/button';
import { environment } from '../../environments';
import { RouterLink } from '@angular/router';
import { Ripple } from 'primeng/ripple';
import { Accounts } from '../accounts';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-mainbar',
  imports: [ButtonDirective, RouterLink, Ripple, Menu],
  templateUrl: './mainbar.html',
  styles: ``,
})
export class Mainbar {
  private readonly _toast = inject(MessageService);

  protected readonly colorScheme = inject(ColorScheme);
  protected readonly accounts = inject(Accounts);

  protected readonly colorSchemeMenuItems = computed<MenuItem[]>(() => {
    return SCHEMES.map((scheme) => ({
      icon: scheme.icon,
      label: `${scheme.value[0].toUpperCase()}${scheme.value.slice(1)}`,
      command: () => this.colorScheme.select(scheme),
    }));
  });

  protected readonly title = environment.title;

  protected signOut() {
    const user = this.accounts.user();
    this.accounts.signOut();
    this._toast.add({
      severity: 'info',
      summary: `Bye${user ? ', ' + user.username : ''}`,
      detail: 'You have signed-out successfully.',
    });
  }
}
