import { Component, OnInit }            from '@angular/core';
import { AdminsService }                from 'src/app/services/admins.service';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { Store }                        from '@ngrx/store';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message }                      from 'src/app/models/message.model';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';

@Component({
  selector   : 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls  : ['./list-admin.component.css'],
  providers  : [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class ListAdminComponent implements OnInit {

  public list = [];

  constructor(
    private adminsService  : AdminsService,
    public  loadingHelper  : LoadingHelper,
    private fireFunctionMsg: FireFunctionMsg,
    private StoreMessage   : Store<string>
  ) { }

  ngOnInit() {
    this.adminsService.GetAll().subscribe(admins => {
      this.list = admins;
    }, this._filterErrors);
  }

  Disable(uid: string) {
    this.loadingHelper.Start();
    this.adminsService.Update(uid, {
      active: false
    }).subscribe(this._allRight.bind(this),
      this._filterErrors);
  }

  Enable(uid: string) {
    this.loadingHelper.Start();
    this.adminsService.Update(uid, {
      active: true
    }).subscribe(this._allRight.bind(this),
      this._filterErrors);
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
