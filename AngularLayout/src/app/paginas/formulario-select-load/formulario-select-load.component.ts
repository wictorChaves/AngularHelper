import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { Item } from 'src/app/services/model/item.model';

import { SelectSearchComponent } from 'src/app/components/form/select-search/select-search.component';
import { SelectItensService }    from 'src/app/services/select-itens.service';

@Component({
  selector   : 'app-formulario-select-load',
  templateUrl: './formulario-select-load.component.html',
  styleUrls  : ['./formulario-select-load.component.css']
})
export class FormularioSelectLoadComponent implements OnInit {

  @ViewChild('ngSelectRegionais') public ngSelectRegionais: SelectSearchComponent;
  @ViewChild('ngSelectFranquias') public ngSelectFranquias: SelectSearchComponent;

  public formulario: FormGroup;
  public resultadoTela;

  public regionais: Item[] = [];
  public franquias: Item[] = [];

  constructor(private selectItensService: SelectItensService) { }

  ngOnInit() {
    this.formulario = new FormGroup({});
    this._carregaInformacoesFormulario();
  }

  private _carregaInformacoesFormulario() {
    this._loadRegional();
    this._loadFranquia();
  }

  changeSelectRegional(evento: Event) {
    this._loadFranquia();
  }

  private _loadRegional() {
    this.selectItensService.getAll().subscribe((itens: any[]) => {
      itens.forEach(item => {
        this.regionais.push(item);
      });
    });
  }

  private _loadFranquia() {
    this._limpaSelectFranquia();
    var idRegional = this.ngSelectRegionais.getValues();
    if (!this._idValido(idRegional)) return;
    this._loadFranquiaById(idRegional);
  }

  private _limpaSelectFranquia() {
    this.franquias = [];
    this.ngSelectFranquias.clear();
  }

  private _loadFranquiaById(id) {
    this.selectItensService.getById(id).subscribe((itens: any[]) => {
      itens.forEach(item => {
        this.franquias.push(item);
      });
    });
  }

  private _idValido(id) {
    return id != undefined;
  }

  onSubmit() {
    this.resultadoTela = {
      regionais: this.ngSelectRegionais.getValues(),
      franquias: this.ngSelectFranquias.getValues()
    }
  }

}
