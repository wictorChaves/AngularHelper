import { Component, OnInit }            from '@angular/core';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message }                      from 'src/app/models/message.model';
import { Store }                        from '@ngrx/store';
import { RoomsService }                 from 'src/app/services/rooms.service';

@Component({
  selector   : 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls  : ['./list-room.component.css'],
  providers  : [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class ListRoomComponent implements OnInit {

  public list = [];

  constructor(
    private roomsService   : RoomsService,
    public  loadingHelper  : LoadingHelper,
    private fireFunctionMsg: FireFunctionMsg,
    private StoreMessage   : Store<string>
  ) { }

  ngOnInit() {
    this.roomsService.GetAll().subscribe(list => {
      this.list = list;
    }, this._filterErrors.bind(this));
  }

  RemoveItem(uid: string) {
    this.loadingHelper.Start();
    this.roomsService.Update(uid, {
      active: false
    }).subscribe(this._allRightRemove.bind(this), this._filterErrors.bind(this));
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
