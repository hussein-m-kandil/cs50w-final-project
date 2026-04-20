import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Button],
  templateUrl: './app.html',
  providers: [MessageService],
})
export class App {
  protected readonly title = environment.title;

  protected toggleDarkMode() {
    document.documentElement.classList.toggle('app-dark');
  }
}
