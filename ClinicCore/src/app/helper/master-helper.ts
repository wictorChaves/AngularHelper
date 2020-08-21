import { UserLogged }  from '../models/user-logged.interface';
import { environment } from 'src/environments/environment';
import { Injectable }  from '@angular/core';
import { User }        from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class MasterHelper {

    public IsMaster(user: any) {
        if (user['claims'] == undefined)
            return this._isMasterUserFirebase(user);
        return this._isMasterUserLogged(user);
    }

    private _isMasterUserLogged(userLogged: UserLogged) {
        return userLogged.claims['email'] == environment.master && userLogged.claims['firebase']['sign_in_provider'] == environment.sign_in_provider;
    }

    private _isMasterUserFirebase(user: User) {
        return user.email == environment.master && user.providerData[0].providerId == environment.sign_in_provider;
    }

    public MasterClaims() {
        return {
            claims: {
                master: true
            }
        }
    }

}
