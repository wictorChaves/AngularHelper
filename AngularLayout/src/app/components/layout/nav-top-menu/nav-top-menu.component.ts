import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.css'],
  host: {
    'class': "navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row navbar-info"
  }
})
export class NavTopMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  accordionMenu() {
    var element = document.querySelector("body");
    var classList = element.classList;
    if (classList.contains("sidebar-icon-only"))
      element.classList.remove("sidebar-icon-only")
    else
      element.classList.add("sidebar-icon-only")
  }

}
