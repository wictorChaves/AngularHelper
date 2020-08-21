import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notificationOptions = {
    position: ["top", "right"],
    timeOut: 3500,
    lastOnBottom: true,
    animate: 'scale',
    theClass: 'notify-item'
  }

  constructor() { }

  ngOnInit() {
  }

}
