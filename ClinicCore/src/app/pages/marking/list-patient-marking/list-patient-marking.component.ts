import { Component, OnInit }            from '@angular/core';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { Store }                        from '@ngrx/store';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message }                      from 'src/app/models/message.model';
import { PatientsService }              from 'src/app/services/patients.service';

@Component({
  selector   : 'app-list-patient-marking',
  templateUrl: './list-patient-marking.component.html',
  styleUrls  : ['./list-patient-marking.component.css'],
  providers  : [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class ListPatientMarkingComponent implements OnInit {

  public list = [];

  constructor(
    private patientstsService: PatientsService,
    public  loadingHelper    : LoadingHelper,
    private fireFunctionMsg  : FireFunctionMsg,
    private StoreMessage     : Store<string>
  ) { }

  ngOnInit() {
    this.patientstsService.GetAll().subscribe(list => {
      this.list = list;
    }, this._filterErrors.bind(this));
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
