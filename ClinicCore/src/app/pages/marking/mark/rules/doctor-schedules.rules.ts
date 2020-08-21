import { FirestoreData } from 'src/app/models/firestore-data.interface';
import { Rules }         from 'src/app/helper/rules/rules';
import { WeekDay } from 'src/app/enum/week-day.enum';

export class DoctorScheduleRules extends Rules {

    private weekDay: number;
    private times  : any[];

    constructor(
        public  sanitizeValues: any,
        private doctorSchedule: FirestoreData
    ) {
        super();
        this._check();
    }

    _sanitizeValues() {
        this.weekDay = this._timestampToWeekDay(this.sanitizeValues['datetimeInitial']);
        this.times = (this.doctorSchedule.data == undefined) ? [] : (this.doctorSchedule.data.times as Array<any>).map(time => ({
            start  : +time.startTime.replace(":", ""),
            end    : +time.endTime.replace(":", ""),
            dayWeek: time.dayWeek
        }));
    }

    _check(): void {

        this._sanitizeValues();

        if (!this._hasSchedules())
            return this._setError("Não existe nenhum horário disponível na agenda do médico");

        if (!this._hasDoctorSchedule())
            return this._setError("Médico não disponível para este horário");

        this._setIsvalid(true);
    }

    private _hasSchedules() {
        return this.times.length > 0;
    }

    protected _hasWeekDay(time: any): boolean {
        return this.weekDay == +WeekDay[time.dayWeek];
    }

    private _hasDoctorSchedule(): boolean {

        var timesInitial = +this.sanitizeValues.timeInitial.replace(":", "");
        var timeFinal    = +this.sanitizeValues.timeFinal.replace(":", "");

        for (let time of this.times) {

            if (
                this._hasWeekDay(time) &&
                this._between(timesInitial, time.start, time.end) &&
                this._between(timeFinal, time.start, time.end)
            )
                return true;
        }

        return false;

    }

}