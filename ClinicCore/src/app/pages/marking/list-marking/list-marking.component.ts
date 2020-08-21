import { Component, OnInit }            from '@angular/core';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { Store }                        from '@ngrx/store';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message }                      from 'src/app/models/message.model';
import { PatientsService }              from 'src/app/services/patients.service';
import { ScheduleService }              from 'src/app/services/schedule.service';
import { DoctorsService }               from 'src/app/services/doctors.service';
import { AngularFireAuth }              from '@angular/fire/auth';
import { MasterHelper }                 from 'src/app/helper/master-helper';
import { Claims }                       from 'src/app/_layouts/main-layout/main-menu/view-model/claims.interface';

@Component({
  selector   : 'app-list-marking',
  templateUrl: './list-marking.component.html',
  styleUrls  : ['./list-marking.component.css'],
  providers  : [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class ListMarkingComponent implements OnInit {

  public list = [];

  public claims: Claims = {
    master   : false,
    admin    : false,
    reception: false,
    doctor   : false,
    patient  : false
  };

  constructor(
    private scheduleService: ScheduleService,
    private doctorsService : DoctorsService,
    private patientsService: PatientsService,
    public  loadingHelper  : LoadingHelper,
    private fireFunctionMsg: FireFunctionMsg,
    private StoreMessage   : Store<string>,
            masterHelper   : MasterHelper,
    public  afAuth         : AngularFireAuth
  ) {
    this.afAuth.user.subscribe(user => {
      if (user == null)
        return;
      if (masterHelper.IsMaster(user))
        return this._setClaims(masterHelper.MasterClaims().claims);
      user.getIdTokenResult().then(idTokenResult => {
        this._setClaims(idTokenResult.claims);
      }).catch(e => console.log(e));
    });
  }

  private _setClaims(claims: any) {
    for (var key in claims) {
      this.claims[key] = claims[key];
    }
  }

  ngOnInit() {
    this.scheduleService.GetStatingCurrentDate().subscribe(list => {
      this.list = [];
      for (let item of list) {
        this.doctorsService.GetById(item.data.uidDoctor).subscribe(doctor => {
          item.data['doctor'] = doctor.data;
          this.patientsService.GetById(item.data.uidPatient).subscribe(patient => {
            item.data['patient'] = patient.data;
            this.list.push(item);
          });
        });
      }
    }, this._filterErrors.bind(this));
  }

  Attended(uid: string) {
    this.scheduleService.Update(uid, {
      status: 'attended'
    }).subscribe(this._allRightAlter.bind(this), this._filterErrors);
  }

  Cancel(uid: string) {
    this.scheduleService.Update(uid, {
      status: 'canceled'
    }).subscribe(this._allRightAlter.bind(this), this._filterErrors);
  }

  _allRightAlter(result: any) {
    this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro alterado com sucesso!")));
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
