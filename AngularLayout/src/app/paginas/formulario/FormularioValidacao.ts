import { DynamicForm } from 'src/app/components/form/helper/dynamic-form';
import { Validators } from '@angular/forms';
import { DynamicoFormValidation } from 'src/app/components/form/helper/dynamico-form-validation';

export class FormularioValidacao extends DynamicoFormValidation {

    constructor(formulario: DynamicForm) {
        super(formulario);
    }

    Validar() {
        this.formulario.ConfigValidation('nome', [Validators.required], this._validarNome.bind(this));
        this.formulario.ConfigValidation('email', [Validators.required], this._validarEmail.bind(this));
    }

    private _validarNome(nameField, valores) {
        var campo = this.formulario.get(nameField);
        this._msgErros[nameField] = campo.invalid && campo.touched ? "Favor preencher o campo nome" : "";
    }

    private _validarEmail(nameField, valores) {
        var campo = this.formulario.get(nameField);
        this._msgErros[nameField] = campo.invalid && campo.touched ? "Favor preencher o campo email" : "";
    }

}
