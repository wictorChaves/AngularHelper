import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable }           from 'rxjs';
import { Injectable }           from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CallTriggerFirebase {

    constructor(
        private fns: AngularFireFunctions
    ) {
    }

    public Call(strFunction: string, data: any): Observable<any> {
        const callable = this.fns.httpsCallable(strFunction);
        return callable(data);
    }

}
