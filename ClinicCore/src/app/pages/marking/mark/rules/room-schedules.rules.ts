import { FirestoreData } from 'src/app/models/firestore-data.interface';
import { Rules }         from 'src/app/helper/rules/rules';

export class RoomScheduleRules extends Rules {

    constructor(
        public  sanitizeValues: any,
        private schedules     : FirestoreData[]
    ) {
        super();
        this._check();
    }

    _check() {
        this._sanitizeValues();
        if (!this._hasFreeRoom())
            return this._setError("A sala não esta disponível neste horário");
    }

    _sanitizeValues() {
        this.schedules = this.schedules.filter(f =>
            f.data.status != 'canceled' &&
            f.data.uidRoom == this.sanitizeValues['uidRoom']
        );
    }

    private _hasFreeRoom() {

        for (let schedule of this.schedules) {

            var currentInitial = this.sanitizeValues.datetimeInitial + 1;
            var currentFinal   = this.sanitizeValues.datetimeFinal;

            if (this._between(currentInitial, schedule.data.datetimeInitial, schedule.data.datetimeFinal))
                return false;

            if (this._between(currentFinal, schedule.data.datetimeInitial, schedule.data.datetimeFinal))
                return false;

            if (this._between(schedule.data.datetimeInitial, currentInitial, currentFinal))
                return false;

            if (this._between(schedule.data.datetimeFinal, currentInitial, currentFinal))
                return false;

        }

        return true;

    }

}