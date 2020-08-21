import { Validators } from '@angular/forms';
import { DynamicForm } from 'src/app/helper/form/dynamic-form';
import { DynamicFormValidation } from 'src/app/helper/form/dynamic-form-validation';

export class Validate extends DynamicFormValidation {

    constructor(formulario: DynamicForm) {
        super(formulario);
    }

    Validar() {
        this.formulario.ConfigValidation('nome', [
            Validators.required,
            Validators.minLength(5)
        ], this._validarNome.bind(this));
        this.formulario.ConfigValidation('email', [
            Validators.required,
            Validators.email
        ], this._validarEmail.bind(this));
        this.formulario.ConfigValidation('password', [
            Validators.required
        ], this._validarPassword.bind(this));
    }

    private _validarNome(nameField, valores) {
        var campo = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "O campo Nome é obrigatorio"
            if ((campo.value as string).length < 5)
                this._msgErros[nameField] = "O campo nome deve ter no mínimo 5 caracteres"
        }
    }

    private _validarEmail(nameField, valores) {
        var campo = this.formulario.get(nameField);
        this._msgErros[nameField] = campo.invalid && campo.touched ? "O campo E-Mail é obrigatorio" : "";
    }

    private _validarPassword(nameField, valores) {
        var campo = this.formulario.get(nameField);
        var campoRePassword = this.formulario.get("rePassword");
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched)
            this._msgErros[nameField] = "O campo Senha é obrigatorio"
        if (campo.touched && campoRePassword.touched)
            if (campo.value != campoRePassword.value)
                this._msgErros[nameField] = "A Confirmação de Senha deve ser igual a Senha"
        this._msgErros["rePassword"] = this._msgErros[nameField];
    }

}
