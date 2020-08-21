import { Validators }            from '@angular/forms';
import { DynamicForm }           from 'src/app/helper/form/dynamic-form';
import { DynamicFormValidation } from 'src/app/helper/form/dynamic-form-validation';
import { DatetimeHelper }        from 'src/app/helper/datetime-helper';

export class Validate extends DynamicFormValidation {

    constructor(formulario: DynamicForm) {
        super(formulario);
    }

    Validar() {
        this.formulario.ConfigValidation('uidDoctor', [Validators.required], this._validarDoctor.bind(this));
        this.formulario.ConfigValidation('uidRoom', [Validators.required], this._validarRoom.bind(this));
        this.formulario.ConfigValidation('date', [Validators.required, Validators.pattern(this.date())], this._validarDateInitial.bind(this));
        this.formulario.ConfigValidation('timeInitial', [Validators.required, Validators.pattern(this.time())], this._validarTimeInitial.bind(this));
        this.formulario.ConfigValidation('timeFinal', [Validators.required, Validators.pattern(this.time())], this._validarTimeFinal.bind(this));
    }

    private _validarDoctor(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = (campo.invalid && campo.touched) ? "O campo Médico é obrigatorio" : "";
    }

    private _validarRoom(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = (campo.invalid && campo.touched) ? "O campo Sala é obrigatorio" : "";
    }

    private _validarDateInitial(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "O campo Data Inicial é obrigatorio";
            if (this.date().test(valores[nameField]))
                this._msgErros[nameField] = "A data deve ser yyyy-mm-dd";
        }
    }

    private _validarTimeInitial(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "O campo Hora Inicial é obrigatorio";
            if (this.time().test(valores[nameField]))
                this._msgErros[nameField] = "A data deve ser hh:mm";
        }
        this._validarStartTimeMaior();
    }

    private _validarTimeFinal(nameField, valores) {
        var            campo      = this.formulario.get(nameField);
        this._msgErros[nameField] = "";
        if (campo.invalid && campo.touched) {
            this._msgErros[nameField] = "O campo Hora Final é obrigatorio";
            if (this.time().test(valores[nameField]))
                this._msgErros[nameField] = "A data deve ser hh:mm";
        }
        this._validarStartTimeMaior();
    }

    private _validarStartTimeMaior() {

        this._msgErros["startTimeMaior"] = "";

        var campoDate   = this.formulario.get('date');
        var campoInicio = this.formulario.get('timeInitial');
        var campoFim    = this.formulario.get('timeFinal');

        var datetimeHelper   = new DatetimeHelper();
        var currentTimeStamp = datetimeHelper.GetCurrentTimeStamp();
        var dateInitial      = datetimeHelper.ToTimestamp(campoDate.value + " " + campoInicio.value);

        if (currentTimeStamp > dateInitial)
            this._msgErros["startTimeMaior"] = "Não pode agendar no passado"

        if (campoInicio.touched && campoFim.touched) {
            let inicio = +(campoInicio.value.replace(':', ''));
            let fim    = +(campoFim.value.replace(':', ''));
            if (inicio >= fim)
                this._msgErros["startTimeMaior"] = "A hora inicio deve ser menor que a hora fim"
        }
    }

}
