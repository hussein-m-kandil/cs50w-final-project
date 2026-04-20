import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = environment.title;
}
