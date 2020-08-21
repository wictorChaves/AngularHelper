import { Component, OnInit } from '@angular/core';
import { DynamicForm } from 'src/app/components/form/helper/dynamic-form';
import { DatepickerConfig } from 'src/app/components/form/helper/datepicker-config';

@Component({
  selector: 'app-formulario-datepicker',
  templateUrl: './formulario-datepicker.component.html',
  styleUrls: ['./formulario-datepicker.component.css'],
  providers: [
    DynamicForm,
    DatepickerConfig
  ]
})
export class FormularioDatepickerComponent implements OnInit {

  public resultadoTela: object;

  constructor(
    public formulario: DynamicForm,
    public datepickerConfig:DatepickerConfig
    ) { }

  ngOnInit() {
    this.formulario.DynamicBuildFormGroup();
    console.log(this.formulario)
  }

  onSubmit() {
    if (!this.formulario.IsValid()) return;

    this.resultadoTela = {
      data: this.formulario.get('data').value
    }
  }

}
