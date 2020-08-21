import { Component, OnInit } from '@angular/core';
import { MasterHelper }      from 'src/app/helper/master-helper';
import { AngularFireAuth }   from '@angular/fire/auth';
import { Router }            from '@angular/router';
import { VariableHelper }    from 'src/app/helper/variable-helper';

@Component({
  selector   : 'app-home',
  templateUrl: './home.component.html',
  styleUrls  : ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loadData = false;

  constructor(
            masterHelper: MasterHelper,
    private router      : Router,
    public  afAuth      : AngularFireAuth
  ) {
    this.afAuth.user.subscribe(user => {
      if (!VariableHelper.HasValue(user))
        return;
      if (masterHelper.IsMaster(user))
        return this._redirect("/administradores");;
      user.getIdTokenResult().then(idTokenResult => {
        if (idTokenResult['claims'].patient) {
          return this._redirect("/perfil/" + user.uid + '/receitas');
        }
        if (idTokenResult['claims'].admin) {
          return this._redirect("/medicos");
        }
        this.loadData = true;
      }).catch(e => console.log(e));
    });
  }

  private _redirect(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnInit() { }

}
