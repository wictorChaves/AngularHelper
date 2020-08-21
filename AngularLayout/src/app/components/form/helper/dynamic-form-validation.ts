import { DynamicForm } from './dynamic-form';
import { DynamicFormValidationField } from './dynamic-form-validation-field';

export abstract class DynamicFormValidation extends DynamicFormValidationField {

    protected _msgErros = [];
    protected formulario: DynamicForm;

    constructor(formulario: DynamicForm) {
        super();
        this.formulario = formulario;
        this.Validar();
    }

    abstract Validar() : void;

    public GetMsgErros() {
        return this._msgErros;
    }
    
}
