import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter }           from '@angular/core';
import { DynamicFormValidation }  from './dynamic-form-validation';

export abstract class DynamicForm extends FormGroup {

    public BeforeSubmit: EventEmitter<any> = new EventEmitter<any>();
    public AfterSubmit: EventEmitter<any>  = new EventEmitter<any>();

    private _listErrors      = [];
    private _formControlName = [];

    constructor() {
        super({});
    }

    ConfigValidation(nameField: string, validacoes, callback) {
        this.get(nameField).setValidators(validacoes);
        this.valueChanges.subscribe((valores) => callback(nameField, valores));
        this._listErrors[nameField] = "";
        return this._listErrors;
    }

    DynamicBuildFormGroupUpdate(valuesForm: object, selectorString: string = null) {
        this.DynamicBuildFormGroup(selectorString, valuesForm);
    }

    public DynamicBuildFormGroup(selectorString: string = null, valuesForm = null) {
        var selector     = (selectorString == null) ? '[formControlName]' : selectorString + ' [formControlName]';
        var formControls = document.querySelectorAll(selector);
        formControls.forEach(formControl => {
            var htmlInputElement = formControl as HTMLInputElement;
            var formControlName  = htmlInputElement.getAttribute("formControlName");
            var valueDefault     = this._hasParameter(valuesForm, formControlName) ? valuesForm[formControlName] : '';
            this.addControl(formControlName, new FormControl(valueDefault));
            this._formControlName.push(formControlName);
        });
    }

    private _hasParameter(item, parameter) {
        if (item == null) return false;
        return !(typeof item[parameter] === 'undefined');
    }

    GetDynamicResults() {
        var results = [];
        var self    = this;
        this._formControlName.forEach(function (name) {
            results[name] = self.get(name).value;
        });
        return Object.assign({}, results);
    }

    IsValid(): boolean {
        Object.keys(this.controls).forEach(field => {
            const control = this.get(field);
            control.markAsTouched({ onlySelf: true });
        });
        this.markAsTouched();
        this.updateValueAndValidity();
        return (this.valid && this.GetListErrorsActive().length <= 0);
    }

    Validation(dynamicFormValidation: DynamicFormValidation) {
        this._listErrors = dynamicFormValidation.GetMsgErros();
    }

    GetListErrors() {
        return this._listErrors;
    }

    GetListErrorsActive() {
        var keysResult = [];
        var errors     = this.GetListErrors();
        Object.keys(errors).forEach(function (element, index, array) {
            if (errors[element] != "")
                keysResult.push(element);
        });
        return keysResult;
    }

    HasError() {
        return this.GetListErrorsActive().length > 0;
    }

    abstract Build(values): void;
    abstract onSubmit()   : void;
}
