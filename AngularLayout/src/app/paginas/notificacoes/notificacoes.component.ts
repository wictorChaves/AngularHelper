import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    
  }

  successNotification(){
    this.notificationsService.success("Titulo", "Mensagem");
  }

  errorNotification(){
    this.notificationsService.error("Titulo", "Mensagem");
  }

  alertNotification(){
    this.notificationsService.alert("Titulo", "Mensagem");
  }

  infoNotification(){
    this.notificationsService.info("Titulo", "Mensagem");
  }

  warnNotification(){
    this.notificationsService.warn("Titulo", "Mensagem");
  }

  bareNotification(){
    this.notificationsService.bare("Titulo", "Mensagem");
  }

}
