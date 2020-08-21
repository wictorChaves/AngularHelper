import { Component, OnInit }            from '@angular/core';
import { LoadingHelper }                from 'src/app/helper/loading-helper';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';
import { Store }                        from '@ngrx/store';
import { MessageSuccess, MessageError } from 'src/app/store/actions/message.actions';
import { Message }                      from 'src/app/models/message.model';
import { PatientsService }              from 'src/app/services/patients.service';
import { ScheduleService }              from 'src/app/services/schedule.service';
import { DoctorsService }               from 'src/app/services/doctors.service';

@Component({
  selector   : 'app-log-marking',
  templateUrl: './log-marking.component.html',
  styleUrls  : ['./log-marking.component.css'],
  providers  : [
    LoadingHelper,
    FireFunctionMsg
  ]
})
export class LogMarkingComponent implements OnInit {

  public allList  = [];
  public listView = [];

  constructor(
    private scheduleService: ScheduleService,
    private doctorsService : DoctorsService,
    private patientsService: PatientsService,
    public  loadingHelper  : LoadingHelper,
    private fireFunctionMsg: FireFunctionMsg,
    private StoreMessage   : Store<string>
  ) { }

  ngOnInit() {
    this.scheduleService.GetAll().subscribe(list => {
      this.allList  = [];
      this.listView = [];
      for (let item of list) {
        this.doctorsService.GetById(item.data.uidDoctor).subscribe(doctor => {
          if (doctor.data == undefined)
            return;
          item.data['doctor'] = doctor.data;
          this.patientsService.GetById(item.data.uidPatient).subscribe(patient => {
            if (patient.data == undefined)
              return;
            item.data['patient'] = patient.data;
            if (item.data['status'] == 'active')
              item.data['status'] = this.IsLate(item.data['datetimeInitial']) ? 'late' : 'active';
            this.allList.push(item);
            this.listView.push(item);
          });
        });
      }
    }, this._filterErrors.bind(this));
  }

  onSearchChange(searchValue: string) {
    if (searchValue.length == 0)
      return this.listView = this.allList;
    this.listView = this.allList.filter(a => {
      if (a.data.patient == undefined)
        return false;
      return a.data.patient.displayName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    });
  }

  IsLate(timestamp: number) {
    var unixTimestampNow = Math.floor(Date.now() / 1000);
    return unixTimestampNow > timestamp;
  }

  private _filterErrors(erro: any): void {
    this.StoreMessage.dispatch(new MessageError(new Message("Erro!", this.fireFunctionMsg.Get(erro, "Erro ao tentar salvar o registro!"))));
    return this._finish(erro);
  }

  private _finish(result: any) {
    return this.loadingHelper.Stop();
  }

}
