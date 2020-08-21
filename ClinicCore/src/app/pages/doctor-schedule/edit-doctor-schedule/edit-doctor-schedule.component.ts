import { Component, OnInit }            from '@angular/core';
import { Form }                         from './forms/form';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { Observable }                   from 'rxjs';
import { Message }                      from 'src/app/models/message.model';
import { FirestoreData }                from 'src/app/models/firestore-data.interface';
import { DoctorScheduleService }        from 'src/app/services/doctor-schedule.service';
import { ActivatedRoute }               from '@angular/router';
import { Store }                        from '@ngrx/store';
import { MessageError, MessageSuccess } from 'src/app/store/actions/message.actions';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';

@Component({
  selector   : 'app-edit-doctor-schedule',
  templateUrl: './edit-doctor-schedule.component.html',
  styleUrls  : ['./edit-doctor-schedule.component.css'],
  providers  : [
    Form,
    LoadingHelper
  ]
})
export class EditDoctorScheduleComponent implements OnInit {

  public message$     : Observable<Message>;
  public firestoreData: FirestoreData;
  public times        : any[] = [];
  public uidDoctor    : string = "";

  constructor(
    public  formulario           : Form,
    public  loadingHelper        : LoadingHelper,
    private route                : ActivatedRoute,
    private StoreMessage         : Store<Message>,
    private fireFunctionMsg      : FireFunctionMsg,
    private doctorScheduleService: DoctorScheduleService
  ) {
    this.uidDoctor = this.route.snapshot.params['uid'];
    this.doctorScheduleService.GetById(this.uidDoctor).subscribe(result => {
      if (result.data != undefined)
        this.times = result.data.times;
    });
  }

  ngOnInit() {
    this.formulario.Build(this.firestoreData);
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
    this.formulario.SubmitResults.subscribe(this.AddTime.bind(this));
  }

  AddTime(time: any) {
    this.loadingHelper.Stop();
    this.times.push(time);
  }

  Save() {
    this.doctorScheduleService.Add(this.uidDoctor, { times: this.times }).subscribe(this._allRight.bind(this), this._filterErrors);
  }

  Excluir(index: number) {
    this.times.splice(index, 1);
  }

  _allRight(result: any) {
    this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro salvo com sucesso!")));
  }

  _filterErrors(erro: any): void {
    this.StoreMessage.dispatch(new MessageError(new Message("Erro!", this.fireFunctionMsg.Get(erro, "Erro ao tentar salvar o registro!"))));
  }

}
