import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-has-danger',
  templateUrl: './has-danger.component.html',
  styleUrls: ['./has-danger.component.css']
})
export class HasDangerComponent implements OnInit {

  @Input() class;
  @HostBinding('class') hostClass: string;

  public classes: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set condition(condition: string) {
    var hasDanger = condition ? 'has-danger' : '';
    this.hostClass = this.class + " " + hasDanger;
  }

}
