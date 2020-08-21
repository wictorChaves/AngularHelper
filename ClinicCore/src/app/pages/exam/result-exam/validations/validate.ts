import { Validators }            from '@angular/forms';
import { DynamicForm }           from 'src/app/helper/form/dynamic-form';
import { DynamicFormValidation } from 'src/app/helper/form/dynamic-form-validation';

export class Validate extends DynamicFormValidation {

    constructor(formulario: DynamicForm) {
        super(formulario);
    }

    Validar() {
        this.formulario.ConfigValidation('uidType', [
            Validators.required
        ], this._validarType.bind(this));
        this.formulario.ConfigValidation('description', [
            Validators.required,
            Validators.minLength(5)
        ], this._validarDescription.bind(this));
    }

    private _validarType(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched)
            this._msgErros[nameField] = "O campo Tipo é obrigatorio"
    }

    private _validarDescription(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "O campo Descrição é obrigatorio"
            if ((campo.value as string).length < 5)
                this._msgErros[nameField] = "O campo Descrição deve ter no mínimo 5 caracteres"
        }
    }

}
