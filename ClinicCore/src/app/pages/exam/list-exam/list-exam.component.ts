import { Component, OnInit }            from '@angular/core';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message }                      from 'src/app/models/message.model';
import { Store }                        from '@ngrx/store';
import { ActivatedRoute }               from '@angular/router';
import { ExamsService }                 from 'src/app/services/exams.service';
import { UserLoggedService }            from 'src/app/services/user-logged.service';
import { Observable, from }             from 'rxjs';

@Component({
  selector   : 'app-list-exam',
  templateUrl: './list-exam.component.html',
  styleUrls  : ['./list-exam.component.css'],
  providers  : [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class ListExamComponent implements OnInit {

  public uid  = "";
  public list = [];
  public userLogged$: Observable<any>;

  constructor(
    private examsService     : ExamsService,
    public  loadingHelper    : LoadingHelper,
    private fireFunctionMsg  : FireFunctionMsg,
    private StoreMessage     : Store<string>,
    private route            : ActivatedRoute,
    public  userLoggedService: UserLoggedService,
  ) {
    this.uid         = this.route.snapshot.parent.params['uid'];
    this.userLogged$ = from(this.userLoggedService.GetUser());
  }

  ngOnInit() {
    this.examsService.GetByUidPatient(this.uid).subscribe(list => {
      this.list = list;
    }, this._filterErrors.bind(this));
  }

  RemoveItem(uid: string) {
    this.loadingHelper.Start();
    this.examsService.Update(uid, {
      active: false
    }).subscribe(this._allRightRemove.bind(this),
      this._filterErrors.bind(this));
  }

  private _alterStatus(uid: string, status: string) {
    this.loadingHelper.Start();
    this.examsService.Update(uid, {
      status: status
    }).subscribe(this._allRight.bind(this),
      this._filterErrors);
  }

  Deliver(uid: string) {
    this._alterStatus(uid, "delivered");
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
