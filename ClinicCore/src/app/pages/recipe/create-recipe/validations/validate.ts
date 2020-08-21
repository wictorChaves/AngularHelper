import { Validators } from '@angular/forms';
import { DynamicForm } from 'src/app/helper/form/dynamic-form';
import { DynamicFormValidation } from 'src/app/helper/form/dynamic-form-validation';

export class Validate extends DynamicFormValidation {

    constructor(formulario: DynamicForm) {
        super(formulario);
    }

    Validar() {
        this.formulario.ConfigValidation('recipeText', [
            Validators.required,
            Validators.minLength(5)
        ], this._validarRecipeText.bind(this));
    }

    private _validarRecipeText(nameField, valores) {
        var campo = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "Você esqueceu de escrever a receita"
            if ((campo.value as string).length < 5)
                this._msgErros[nameField] = "A receita deve ter pelo menos 5 caracteres"
        }
    }

}
