import { Component, OnInit } from '@angular/core';
import { MedicineService }   from 'src/app/services/medicine.service';
import { Store }             from '@ngrx/store';
import { MessageError }      from 'src/app/store/actions/message.actions';
import { FireFunctionMsg }   from 'src/app/helper/fire-funcition-msg';
import { Message }           from 'src/app/models/message.model';
import { Form }              from './forms/form';
import { LoadingHelper }     from 'src/app/helper/loading-helper';
import { ActivatedRoute }    from '@angular/router';

@Component({
  selector   : 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls  : ['./create-recipe.component.css'],
  providers  : [
    Form,
    LoadingHelper
  ]
})
export class CreateRecipeComponent implements OnInit {

  public list               = [];
  public selectedItems      = []
  public uidPatient: string = "";

  constructor(
    private medicineService: MedicineService,
    private fireFunctionMsg: FireFunctionMsg,
    private StoreMessage   : Store<string>,
    public  formulario     : Form,
    public  loadingHelper  : LoadingHelper,
    private route          : ActivatedRoute
  ) {
    this.uidPatient = this.route.snapshot.parent.params['uid'];
  }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.ClearSelectItem = this.ClearSelectedItems.bind(this);
    this.medicineService.GetAll().subscribe(list => {
      this.list = list.filter(m => m.data['active']);
    }, this._filterErrors.bind(this));
  }

  ClearSelectedItems() {
    this.selectedItems = [];
  }

  AddItem(uid: string) {
    var item     = this.list.find(l => l.uid == uid);
    var sameItem = this.selectedItems.find(l => l.uid == item.uid);
    if (sameItem == undefined) {
               sameItem    = item;
      sameItem['quantity'] = 1
      this.selectedItems.push(sameItem);
    } else {
      sameItem['quantity'] = sameItem['quantity'] + 1;
    }
    this.formulario.setValue({
      recipeText: this.formulario.get('recipeText').value + " \n" + item.data.nome
    });
    this.formulario.AddSelectedItems(this.selectedItems)
  }

  RemoveItem(uid: string) {
    this.selectedItems = this.selectedItems.filter(s => s.uid != uid);
  }

  Salvar() {
    this.formulario.onSubmit();
  }

  _filterErrors(erro: any): void {
    this.StoreMessage.dispatch(new MessageError(new Message("Erro!", this.fireFunctionMsg.Get(erro, "Erro ao tentar salvar o registro!"))));
    return this._finish(erro);
  }

  private _finish(result: any) {
  }

}
