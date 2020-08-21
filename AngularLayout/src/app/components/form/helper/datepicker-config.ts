import { IMyDpOptions } from "mydatepicker";

export class DatepickerConfig {

    private _dateOptions: IMyDpOptions = {
        dayLabels: { su: "Dom", mo: "Seg", tu: "Ter", we: "Qua", th: "Qui", fr: "Sex", sa: "Sab" },
        monthLabels: { 1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez" },
        dateFormat: "dd/mm/yyyy",
        todayBtnTxt: "Hoje",
        firstDayOfWeek: "su",
        sunHighlight: true
    }

    public get(){
        return this._dateOptions;
    }

}
