import { Regex } from 'src/app/helper/regex';

export class DynamicFormValidationField extends Regex {

    public IsNumber(valor) {
        return !isNaN(valor) && this.IsNullOrEmpty(valor);
    }

    public isInteger(valor) {
        return Number.isInteger(Number.parseInt(valor)) && Number.parseInt(valor).toString() == valor;
    }

    public IsNullOrEmpty(valor){
        return valor != undefined && valor != null && valor != "";
    }

}
