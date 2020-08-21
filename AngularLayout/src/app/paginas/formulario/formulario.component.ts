import { Component, OnInit } from '@angular/core';
import { DynamicForm }         from 'src/app/components/form/helper/dynamic-form';
import { FormularioValidacao } from "./FormularioValidacao";

@Component({
  selector:    'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:   ['./formulario.component.css'],
  providers:   [DynamicForm]
})
export class FormularioComponent implements OnInit {

  public resultadoTela: object;
  public msgValidacao = [];

  constructor(public formulario: DynamicForm) { }

  ngOnInit() {
    this.formulario.DynamicBuildFormGroup();
    this.msgValidacao = new FormularioValidacao(this.formulario).GetMsgErros();
  }

  onSubmit() {
    if (!this.formulario.IsValid()) return;

    this.resultadoTela = {
      nome: this.formulario.get('nome').value,
      email: this.formulario.get('email').value,
      senha: this.formulario.get('senha').value,
      texto: this.formulario.get('texto').value,
      checkbox: this.formulario.get('checkbox').value ? true : false
    }
  }

}
