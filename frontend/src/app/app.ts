import { Navigation, Navigator } from './navigation';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigator, Toast, Button],
  templateUrl: './app.html',
  providers: [MessageService],
})
export class App {
  protected readonly title = environment.title;
  protected readonly navigation = inject(Navigation);

  protected toggleDarkMode() {
    document.documentElement.classList.toggle('app-dark');
  }
}
