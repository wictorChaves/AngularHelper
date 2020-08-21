import { FirestoreData } from 'src/app/models/firestore-data.interface';
import { Rules }         from 'src/app/helper/rules/rules';

export class AvailableSchedule extends Rules {


    constructor(
        public  sanitizeValues: any,
        private schedules     : FirestoreData[]
    ) {
        super();
        this._check();
    }

    _check() {
        this._sanitizeValues();
        if (!this._hasFreeSpot())
            return this._setError("Há outro agendamento neste horário");
    }

    _sanitizeValues() {
        this.schedules = this.schedules.filter(f =>
            f.data.status != 'canceled' &&
            f.data.uidDoctor == this.sanitizeValues['uidDoctor']
        );
    }

    private _hasFreeSpot() {

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