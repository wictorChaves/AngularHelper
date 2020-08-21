import { Component, OnInit } from '@angular/core';
import { Form }              from './forms/form';
import { LoadingHelper }     from 'src/app/helper/loading-helper';
import { Observable }        from 'rxjs';
import { Message }           from 'src/app/models/message.model';

@Component({
  selector   : 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls  : ['./add-room.component.css'],
  providers  : [
    Form,
    LoadingHelper
  ]
})
export class AddRoomComponent implements OnInit {

  public message$: Observable<Message>;

  constructor(
    public formulario   : Form,
    public loadingHelper: LoadingHelper
  ) { }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
  }

}
