import { Component, OnInit } from '@angular/core';
import { Form } from './forms/form';
import { LoadingHelper } from 'src/app/helper/loading-helper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css'],
  providers: [
    Form,
    LoadingHelper
  ]
})
export class CreateDoctorComponent implements OnInit {

  constructor(
    public formulario: Form,
    public loadingHelper: LoadingHelper
  ) { }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
  }

}
