import { RouterOutlet, RouterLink } from '@angular/router';
import { Navigation, Navigator } from './navigation';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { environment } from '../environments';
import { MessageService } from 'primeng/api';
import { Accounts } from './accounts';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [NgTemplateOutlet, RouterOutlet, RouterLink, Navigator, Toast],
  templateUrl: './app.html',
  providers: [MessageService],
})
export class App {
  protected readonly title = environment.title;
  protected readonly navigation = inject(Navigation);
  protected readonly accounts = inject(Accounts);
}
