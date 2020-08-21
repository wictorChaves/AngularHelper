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

}
