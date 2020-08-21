import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    'class': 'container-scroller'
  }
})
export class AppComponent {
  title = 'AngularLayout';
}
