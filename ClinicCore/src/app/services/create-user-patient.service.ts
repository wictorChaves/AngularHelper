import { Injectable } from '@angular/core';
import { CallTriggerFirebase } from '../helper/call-trigger-firebase';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { FireFunctionReturn } from '../models/fire-function-return.model';

@Injectable({
  providedIn: 'root'
})
export class CreateUserPatient extends CallTriggerFirebase {

  public AddUser(user: User): Observable<FireFunctionReturn> {
    return this.Call("createUserPatient", user) as Observable<FireFunctionReturn>;
  }

}
