import { FormGroup, FormControl } from '@angular/forms';

export class DynamicForm extends FormGroup {

    public msgValidacao = [];

    constructor() {
        super({});
    }

    ConfigValidation(nameField: string, validacoes, callback) {
        this.get(nameField).setValidators(validacoes);
        this.valueChanges.subscribe((valores) => callback(nameField, valores));
        this.msgValidacao[nameField] = "";
        return this.msgValidacao;
    }

    DynamicBuildFormGroup() {
        var formControls = document.querySelectorAll('[formControlName]');
        formControls.forEach(formControl => {
            var htmlInputElement = formControl as HTMLInputElement;
            var formControlName = htmlInputElement.getAttribute("formControlName");
            this.addControl(formControlName, new FormControl(''));
        });
    }

    IsValid(): boolean {
        Object.keys(this.controls).forEach(field => {
            const control = this.get(field);
            control.markAsTouched({ onlySelf: true });
        });
        this.updateValueAndValidity();
        return this.valid;
    }
}
