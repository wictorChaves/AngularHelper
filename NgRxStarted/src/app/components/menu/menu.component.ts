import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    'class': 'nav-scroller py-1 mb-2'
  }
})
export class MenuComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

}
