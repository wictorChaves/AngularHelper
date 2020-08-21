import { DynamicFormSanitize } from 'src/app/helper/form/dynamic-form-sanitize';

export class Sanitize extends DynamicFormSanitize {

    constructor(values: any) {
        super(values);
    }

    Exec() {
        return this.values;
    }

}
