import { DynamicFormSanitize } from 'src/app/helper/form/dynamic-form-sanitize';

export class Sanitize extends DynamicFormSanitize {

    constructor(
        values: any
    ) {
        super(values);
    }

    Exec() {
        this.Sanitize("datetimeInitial", this._datetimeInitial.bind(this));
        this.Sanitize("datetimeFinal", this._datetimeFinal.bind(this));
        this.Sanitize("status", this._status.bind(this));
        return this.values;
    }

    private _status(valor: string) {
        if (this.values["status"] == undefined)
            return this.values["status"] = "active"
        return valor;
    }

    private _datetimeInitial(valor: string) {
        return this.toTimestamp(this.values["date"] + " " + this.values["timeInitial"]);
    }

    private _datetimeFinal(valor: string) {
        return this.toTimestamp(this.values["date"] + " " + this.values["timeFinal"]);
    }

    toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

}
