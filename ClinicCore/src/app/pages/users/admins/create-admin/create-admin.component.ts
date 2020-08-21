import { Component, OnInit } from '@angular/core';
import { AdminForm } from './forms/admin.form';
import { LoadingHelper } from 'src/app/helper/loading-helper';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
  providers: [
    AdminForm,
    LoadingHelper
  ]
})
export class CreateAdminComponent implements OnInit {

  public message$: Observable<Message>;

  constructor(
    public formulario: AdminForm,
    public loadingHelper: LoadingHelper
  ) { }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
  }

}
