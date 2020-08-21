import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgSelectComponent, NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-select-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.css']
})
export class SelectSearchComponent implements OnInit {

  @ViewChild('ngSelect') public ngSelect: NgSelectComponent;

  @Input() itens;
  @Input() multiple = true;

  @Output() change = new EventEmitter<Event>();

  public itensSelecionados;
  public placeholder = "Selecione";

  constructor() { }

  ngOnInit() {
    this.itensSelecionados = (this.multiple) ? [] : this.placeholder;
  }

  public changeSelect(event: Event) {
    this.change.emit(event);
  }

  public clearItem(id:number) : void{
    this.ngSelect.clearItem(id);
  }

  public clear() : void{
    this.ngSelect.clearItem(this.getValues());
  }

  public getValues(){    
    return this.itensSelecionados;
  }

}
