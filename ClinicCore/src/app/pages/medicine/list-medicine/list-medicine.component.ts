import { Component, OnInit } from '@angular/core';
import { LoadingHelper } from 'src/app/helper/loading-helper';
import { FireFunctionMsg } from 'src/app/helper/fire-funcition-msg';
import { Store } from '@ngrx/store';
import { MedicineService } from 'src/app/services/medicine.service';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.css'],
  providers: [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class ListMedicineComponent implements OnInit {

  public list = [];

  constructor(
    private patientstsService: MedicineService,
    public loadingHelper: LoadingHelper,
    private fireFunctionMsg: FireFunctionMsg,
    private StoreMessage: Store<string>
  ) { }

  ngOnInit() {
    this.patientstsService.GetAll().subscribe(list => {
      this.list = list;
    }, this._filterErrors.bind(this));
  }

  RemoveItem(uid: string) {
    this.loadingHelper.Start();
    this.patientstsService.Update(uid, {
      active: false
    }).subscribe(this._allRightRemove.bind(this),
      this._filterErrors.bind(this));
  }

  _allRightRemove(result: any) {
    this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Item excluído com sucesso!")));
    return this._finish(result);
  }

  _allRight(result: any) {
    this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro salvo com sucesso!")));
    return this._finish(result);
  }

  _filterErrors(erro: any): void {
    this.StoreMessage.dispatch(new MessageError(new Message("Erro!", this.fireFunctionMsg.Get(erro, "Erro ao tentar salvar o registro!"))));
    return this._finish(erro);
  }

  private _finish(result: any) {
    return this.loadingHelper.Stop();
  }

}
