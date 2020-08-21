import { Component, OnInit } from '@angular/core';
import { Form } from './forms/form';
import { LoadingHelper } from 'src/app/helper/loading-helper';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { FirestoreData } from 'src/app/models/firestore-data.interface';

@Component({
  selector: 'app-edit-receptionists',
  templateUrl: './edit-receptionists.component.html',
  styleUrls: ['./edit-receptionists.component.css'],
  providers: [
    Form,
    LoadingHelper
  ]
})
export class EditReceptionistsComponent implements OnInit {

  public message$: Observable<Message>;
  public firestoreData: FirestoreData;

  constructor(
    public formulario: Form,
    public loadingHelper: LoadingHelper,
  ) {}

  ngOnInit() {
    this.formulario.Build(this.firestoreData);
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
  }

}
