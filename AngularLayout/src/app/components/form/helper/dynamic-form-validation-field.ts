export class DynamicFormValidationField {

    public IsNumber(valor) {
        return !isNaN(valor) && this.IsNullOrEmpty(valor);
    }

    public IsNullOrEmpty(valor){
        return valor != undefined && valor != null && valor != "";
    }

}
