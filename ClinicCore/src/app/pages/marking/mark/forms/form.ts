import { Store }                        from '@ngrx/store';
import { DynamicForm }                  from 'src/app/helper/form/dynamic-form';
import { AngularFireAuth }              from '@angular/fire/auth';
import { UserLogin }                    from 'src/app/models/user-login.interface';
import { Message }                      from 'src/app/models/message.model';
import { MessageError, MessageSuccess } from 'src/app/store/actions/message.actions';
import { Injectable }                   from '@angular/core';
import { FireFunctionMsg }              from 'src/app/helper/fire-funcition-msg';;
import { Validate }                     from '../validations/validate';
import { Sanitize }                     from '../sanitations/sanitize';
import { ActivatedRoute }               from '@angular/router';
import { ScheduleService }              from 'src/app/services/schedule.service';
import { DoctorScheduleService }        from 'src/app/services/doctor-schedule.service';
import { DoctorScheduleRules }          from '../rules/doctor-schedules.rules';
import { AvailableSchedule }            from '../rules/available-schedule.rules';
import { RoomScheduleRules }            from '../rules/room-schedules.rules';

@Injectable({
    providedIn: 'root'
})
export class Form extends DynamicForm {

    public uidPatient = "";

    constructor(
        public  afAuth               : AngularFireAuth,
        private StoreMessage         : Store<Message>,
        private fireFunctionMsg      : FireFunctionMsg,
        private route                : ActivatedRoute,
        private doctorScheduleService: DoctorScheduleService,
        private scheduleService      : ScheduleService
    ) {
        super();
        this.uidPatient = this.route.snapshot.params['uid'];
    }

    public Build() {
        this.DynamicBuildFormGroup();
        this.Validation(new Validate(this));
    }

    onSubmit() {
        this.BeforeSubmit.emit();
        if (!this.IsValid()) return this.AfterSubmit.emit();

        var valores        = this.GetDynamicResults();
        var sanitizeValues = new Sanitize(valores).Exec() as any;

        sanitizeValues['uidPatient'] = this.uidPatient;

        var ob = this.doctorScheduleService.GetById(sanitizeValues['uidDoctor']).subscribe(doctorSchedule => {

            var doctorScheduleRules = new DoctorScheduleRules(sanitizeValues, doctorSchedule);
            if (!doctorScheduleRules.IsValid()) {
                this.StoreMessage.dispatch(new MessageError(new Message("Erro!", doctorScheduleRules.GetErrorMsg())));
                ob.unsubscribe();
                return this._finish();
            }

            var ob2 = this.scheduleService.GetStatingCurrentDate().subscribe(schedules => {

                var availableSchedule = new AvailableSchedule(sanitizeValues, schedules);
                if (!availableSchedule.IsValid()) {
                    this.StoreMessage.dispatch(new MessageError(new Message("Erro!", availableSchedule.GetErrorMsg())));
                    ob.unsubscribe();
                    ob2.unsubscribe();
                    return this._finish();
                }

                var roomScheduleRules = new RoomScheduleRules(sanitizeValues, schedules);
                if (!roomScheduleRules.IsValid()) {
                    this.StoreMessage.dispatch(new MessageError(new Message("Erro!", roomScheduleRules.GetErrorMsg())));
                    ob.unsubscribe();
                    ob2.unsubscribe();
                    return this._finish();
                }

                this.scheduleService.Add(sanitizeValues).subscribe(this._allRight.bind(this), this._filterErrors);

                ob.unsubscribe();
                ob2.unsubscribe();
            });
        });
    }

    _allRight(result: any) {
        this.StoreMessage.dispatch(new MessageSuccess(new Message("Tudo certo!", "Registro salvo com sucesso!")));
        this.reset();
        return this._finish(result);
    }

    _filterErrors(erro: any): void {
        this.StoreMessage.dispatch(new MessageError(new Message("Erro!", this.fireFunctionMsg.Get(erro, "Erro ao tentar salvar o registro!"))));
        return this._finish(erro);
    }

    private _finish(result: any = null) {
        return this.AfterSubmit.emit();
    }

}
