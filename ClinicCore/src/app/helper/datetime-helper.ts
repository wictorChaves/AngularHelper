import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DatetimeHelper {

    ToTimestamp(strDate: string) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    GetTodayTimestamp() {
        var currentTimeStr = this.GetDateNow() + " 00:00";
        return this.ToTimestamp(currentTimeStr);
    }

    GetDateNow() {
        return this.GetDatetimeNow().toISOString().split('T')[0];
    }

    GetTimeNow(hour: number = 0, min: number = 0) {
        var hours   = this.GetDatetimeNow().getHours() + hour;
        var minutes = this.GetDatetimeNow().getMinutes() + min;
        return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
    }

    GetDatetimeNow() {
        return new Date();
    }

    GetCurrentTimeStamp() {
        return Math.floor(Date.now() / 1000);
    }

}
