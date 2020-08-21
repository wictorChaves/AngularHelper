import { DynamicFormSanitize } from 'src/app/helper/form/dynamic-form-sanitize';

export class Sanitize extends DynamicFormSanitize {

    constructor(values: any) {
        super(values);
    }

    Exec() {
        this.Sanitize("email", this._email.bind(this));
        return this.values;
    }

    private _email(valor: string) {
        return valor.replace(/\s/g, "");
    }

}
