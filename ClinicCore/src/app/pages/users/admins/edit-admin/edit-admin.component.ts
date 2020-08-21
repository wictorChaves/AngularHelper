import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs';
import { Message }           from 'src/app/models/message.model';
import { Form }              from './forms/form';
import { LoadingHelper }     from 'src/app/helper/loading-helper';
import { FirestoreData }     from 'src/app/models/firestore-data.interface';

@Component({
  selector   : 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls  : ['./edit-admin.component.css'],
  providers  : [
    Form,
    LoadingHelper
  ]
})
export class EditAdminComponent implements OnInit {

  public message$     : Observable<Message>;
  public firestoreData: FirestoreData;

  constructor(
    public formulario   : Form,
    public loadingHelper: LoadingHelper,
  ) { }

  ngOnInit() {
    this.formulario.Build(this.firestoreData);
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
  }

}
