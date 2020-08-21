import { DynamicForm } from './dynamic-form';

export abstract class DynamicoFormValidation {

    protected _msgErros = [];
    protected formulario: DynamicForm;

    constructor(formulario: DynamicForm) {
        this.formulario = formulario;
        this.Validar();
    }

    abstract Validar() : void;

    public GetMsgErros() {
        return this._msgErros;
    }
    
}
