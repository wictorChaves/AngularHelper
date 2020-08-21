import { Component, OnInit } from '@angular/core';
import { Form } from './forms/form';
import { LoadingHelper } from 'src/app/helper/loading-helper';

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css'],
  providers: [
    Form,
    LoadingHelper
  ]
})
export class CreateMedicineComponent implements OnInit {

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
