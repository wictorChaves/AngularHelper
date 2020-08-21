import { DynamicForm }                from './dynamic-form';
import { DynamicFormValidationField } from './dynamic-form-validation-field';
import { Validators }                 from '@angular/forms';

export abstract class DynamicFormValidation extends DynamicFormValidationField {

    protected _msgErros = [];
    protected formulario: DynamicForm;

    constructor(formulario: DynamicForm) {
        super();
        this.formulario = formulario;
        this.Validar();
    }

    abstract Validar(): void;

    public GetMsgErros() {
        return this._msgErros;
    }

    public ValidatorsPositiveInteger(min = 0, max = 999999999) {
        return [
            Validators.required,
            Validators.min(min),
            Validators.max(max),
            Validators.pattern(this.interger())
        ]
    }

    public ValidatorsInteger() {
        return [
            Validators.required,
            Validators.pattern(this.interger())
        ]
    }

}
