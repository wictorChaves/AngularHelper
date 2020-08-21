import { Injectable }      from '@angular/core';
import { SessionStorage }  from './helper/storage/session-storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserLogged }      from '../models/user-logged.interface';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  private _key: string = "user-logged";

  constructor(
    public  afAuth        : AngularFireAuth,
    private sessionStorage: SessionStorage
  ) { }

  public async GetUser() {
    var userLogged = this.sessionStorage.getItem(this._key);
    if (userLogged == null)
      await this._setUser();
    else
      return userLogged;
    return this.sessionStorage.getItem(this._key);
  }

  public SetUser(userLogged: UserLogged) {
    return this.sessionStorage.setItem(this._key, userLogged);
  }

  public Logout() {
    this.afAuth.auth.signOut();
    return this.sessionStorage.removeItem(this._key);
  }

  async LoadUser() {
    await this._setUser();
  }

  private _setUser() {
    return this.afAuth.user.subscribe(async userCredential => {
      if (userCredential == null)
        return this.sessionStorage.setItem(this._key, null);
      await userCredential.getIdTokenResult().then(idTokenResult => {
        this.sessionStorage.setItem(this._key,
          {
            email : userCredential.email,
            claims: idTokenResult.claims
          });
      }).catch(e => console.log(e));
    });
  }



}
