import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VariableHelper {

    public static HasValue(value: any) {
        if (value == undefined)
            return false;
        if (value == null)
            return false;
        if (value == "")
            return false;
        return true;
    }

}
