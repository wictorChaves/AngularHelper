import { DynamicFormSanitize } from 'src/app/helper/form/dynamic-form-sanitize';

export class Sanitize extends DynamicFormSanitize {

    constructor(
        values: any
    ) {
        super(values);
    }

    Exec() {
        this.Sanitize("status", this._status.bind(this));
        return this.values;
    }

    private _status(valor: string) {
        if (this.values["status"] == undefined)
            return this.values["status"] = "result"
        return valor;
    }

}
