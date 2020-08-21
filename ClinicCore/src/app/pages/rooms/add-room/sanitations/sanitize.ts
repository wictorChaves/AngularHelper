import { DynamicFormSanitize } from 'src/app/helper/form/dynamic-form-sanitize';

export class Sanitize extends DynamicFormSanitize {

    constructor(
        values: any
    ) {
        super(values);
    }

    Exec() {
        this.Sanitize("active", this._active.bind(this));
        return this.values;
    }

    private _active(valor: string) {
        if (this.values["active"] == undefined)
            return this.values["active"] = true
        return valor;
    }

}
