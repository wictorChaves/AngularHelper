import { Validators }            from'@angular/forms';
import { DynamicForm }           from'src/app/helper/form/dynamic-form';
import { DynamicFormValidation } from'src/app/helper/form/dynamic-form-validation';

export class Validate extends DynamicFormValidation {

    constructor(formulario: DynamicForm) {
        super(formulario);
    }

    Validar() {

        this.formulario.ConfigValidation('dayWeek', [
            Validators.required
        ], this._validarDayWeek.bind(this));

        this.formulario.ConfigValidation('startTime', [
            Validators.required,
            Validators.pattern(this.time())
        ], this._validarStartTime.bind(this));

        this.formulario.ConfigValidation('endTime', [
            Validators.required,
            Validators.pattern(this.time())
        ], this._validarEndTime.bind(this));

    }

    private _validarDayWeek(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched)
            this._msgErros[nameField] = "O campo Dia da Semana é obrigatorio"
    }

    private _validarStartTimeMaior() {

        this._msgErros["startTimeMaior"] = "";

        var campoInicio = this.formulario.get('startTime');
        var campoFim    = this.formulario.get('endTime');

        if (campoInicio.touched && campoFim.touched) {
            let inicio = +(campoInicio.value.replace(':', ''));
            let fim    = +(campoFim.value.replace(':', ''));
            if (inicio >= fim)
                this._msgErros["startTimeMaior"] = "A hora inicio deve ser menor que a hora fim"
        }
    }

    private _validarStartTime(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "O campo Hora Inicio é obrigatorio"
            if (this.time().test(valores[nameField]))
                this._msgErros[nameField] = "O campo Hora Inicio é inválido"
        }
        this._validarStartTimeMaior();
    }

    private _validarEndTime(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "O campo Hora Fim é obrigatorio"
            if (this.time().test(valores[nameField]))
                this._msgErros[nameField] = "O campo Hora Fim é inválido"
        }
        this._validarStartTimeMaior();
    }

}
