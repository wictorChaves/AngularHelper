import { Injectable }                                                       from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth }                                                  from '@angular/fire/auth';
import { Store }                                                            from '@ngrx/store';
import { UserLoggedService }                                                from './user-logged.service';
import { Message }                                                          from '../models/message.model';
import { MessageError }                                                     from '../store/actions/message.actions';
import { MasterHelper }                                                     from '../helper/master-helper';
import { environment }                                                      from 'src/environments/environment.prod';
import { VariableHelper }                                                   from '../helper/variable-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate {

  constructor(
    private router           : Router,
    public  afAuth           : AngularFireAuth,
    public  userLoggedService: UserLoggedService,
    private StoreMessage     : Store<Message>,
    private masterHelper     : MasterHelper
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userLoggedService.GetUser().then(userLogged => {
      if (!VariableHelper.HasValue(userLogged)) {
        var currentUrl = (route.url.length <= 0) ? "" : route.url[0].path;
        this._checkLoginAndRedirect(currentUrl);
        return false;
      }
      if (this.masterHelper.IsMaster(userLogged))
        return this._accessAllow();
      if (route.data.token != undefined) {
        return this._accessConditional(userLogged.claims[route.data.token] == true);
      }
      return this._accessAllow()
    }).catch(e => {
      console.log(e);
      return false;
    });
  }

  private _checkLoginAndRedirect(currentUrl: string) {
    this.afAuth.user.subscribe(user => {
      if (!VariableHelper.HasValue(user))
        return this._redirect("/login");
      if (this.masterHelper.IsMaster(user))
        return this.masterHelper.MasterClaims();
      user.getIdTokenResult().then(idTokenResult => {
        return this._redirect(currentUrl);
      }).catch(e => console.log(e));
    })
  }

  private _redirect(url: string) {
    this.router.navigateByUrl(url);
  }

  private _accessConditional(condition: boolean) {
    return condition ? this._accessAllow(): this._accessDenied();
  }

  private _accessDenied() {
    if (this.router.url != environment.root_path)
      this.StoreMessage.dispatch(new MessageError(new Message("Erro", "Acesso Negado!")))
    return false;
  }

  private _accessAllow() {
    return true;
  }

}
