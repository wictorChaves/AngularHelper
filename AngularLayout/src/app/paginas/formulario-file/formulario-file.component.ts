import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileModel } from 'src/app/components/form/input-file/model/file.model';

@Component({
  selector: 'app-formulario-file',
  templateUrl: './formulario-file.component.html',
  styleUrls: ['./formulario-file.component.css']
})
export class FormularioFileComponent implements OnInit {

  public formulario: FormGroup;
  public resultadoTela;
  public arquivo: FileModel;

  constructor() { }

  ngOnInit() {
    this.formulario = new FormGroup({});
  }

  fileChange(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        var resultado = reader.result as string;
        this.arquivo = {
          filename: file.name,
          filetype: file.type,
          value: resultado.split(',')[1]
        };
      };
    }
  }

  onSubmit() {
    this.resultadoTela = {
      arquivo: this.arquivo
    }
  }

}
