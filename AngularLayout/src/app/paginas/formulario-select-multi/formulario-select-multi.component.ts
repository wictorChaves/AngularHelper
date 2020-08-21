import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { Item }               from 'src/app/services/model/item.model';
import { SelectItensService } from 'src/app/services/select-itens.service';

import { SelectSearchComponent } from 'src/app/components/form/select-search/select-search.component';

@Component({
  selector: 'app-formulario-select-multi',
  templateUrl: './formulario-select-multi.component.html',
  styleUrls: ['./formulario-select-multi.component.css']
})
export class FormularioSelectMultiComponent implements OnInit {

  @ViewChild('ngSelect') public ngSelect: SelectSearchComponent;

  public formulario: FormGroup;
  public resultadoTela;

  public itensSelect: Item[];  
  public itensSelectSelecionados:number[];

  constructor(private selectItensService :SelectItensService) { }

  ngOnInit() {
    this.formulario = new FormGroup({});
    this._loadSelect();
  }

  private _loadSelect(){
    this.selectItensService.getAll().subscribe((itens: Item[]) => {
      this.itensSelect = itens;
    });
  }

  onSubmit() {
    this.resultadoTela = {
      select: this.ngSelect.getValues()
    }
  }
  

}
