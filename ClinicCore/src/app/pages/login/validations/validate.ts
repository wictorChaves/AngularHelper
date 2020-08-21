import { Validators }            from '@angular/forms';
import { DynamicForm }           from 'src/app/helper/form/dynamic-form';
import { DynamicFormValidation } from 'src/app/helper/form/dynamic-form-validation';

export class Validate extends DynamicFormValidation {

    constructor(formulario: DynamicForm) {
        super(formulario);
    }

    Validar() {

        this.formulario.ConfigValidation('email', [
            Validators.required,
            Validators.email
        ], this._validarEmail.bind(this));

        this.formulario.ConfigValidation('password', [
            Validators.required
        ], this._validarPassword.bind(this));
        
    }

    private _validarEmail(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = campo.invalid && campo.touched ? "O campo E-Mail é obrigatorio" : "";
    }

    private _validarPassword(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = campo.invalid && campo.touched ? "O campo Senha é obrigatorio" : "";
    }

}
