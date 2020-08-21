import { Component, OnInit }    from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

import { EventoHelper }    from 'src/app/helper/evento-helper';
import { RenderItensMenu } from './render-itens-menu';

@Component({
  selector:    'app-menu',
  templateUrl: './menu.component.html',
  styleUrls:   ['./menu.component.css'],
  providers: [ RenderItensMenu ],
})
export class MenuComponent implements OnInit {

  rota = window.location.pathname;
  itens = []

  constructor(private router: Router, private renderItensMenu:RenderItensMenu) {
      var self = this;
      this.router.events.pipe().subscribe((ev: NavigationEnd) => {
        self.rota = ev.url != undefined ? ev.url : self.rota;
      });
  }

  ngOnInit() {
    this.itens = this.renderItensMenu.itens;
  }

  mouseEnterLi(event){
    var target = new EventoHelper(event);
    target.addClass("hover-open");
  }

  mouseLeaveLi(event){
    var target = new EventoHelper(event);
    target.removeClass("hover-open");
  }

}
