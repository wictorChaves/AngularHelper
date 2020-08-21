import { Component, OnInit, Inject } from '@angular/core';
import { MasterHelper }              from 'src/app/helper/master-helper';
import { AngularFireAuth }           from '@angular/fire/auth';
import { Claims }                    from './view-model/claims.interface';
import { DOCUMENT }                  from '@angular/common';

@Component({
  selector   : 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls  : ['./main-menu.component.css'],
  providers  : [
    MasterHelper
  ]
})
export class MainMenuComponent implements OnInit {

  public claims: Claims = {
    master   : false,
    admin    : false,
    reception: false,
    doctor   : false,
    patient  : false
  };
  idMenu: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
            masterHelper              : MasterHelper,
    public  afAuth                    : AngularFireAuth
  ) {
    this.afAuth.user.subscribe(user => {
      if (user == null)
        return;
      if (masterHelper.IsMaster(user))
        return this._setClaims(masterHelper.MasterClaims().claims);
      user.getIdTokenResult().then(idTokenResult => {
        this._setClaims(idTokenResult.claims);
      }).catch(e => console.log(e));
    });
  }

  private _setClaims(claims: any) {
    for (var key in claims) {
      this.claims[key] = claims[key];
    }
  }

  ngOnInit() {
    console.log("Ajustar layout")
    this._layoutRestore();
  }

  private _layoutRestore() {
    this.document.body.classList.add('horizontal');
    this.document.body.classList.remove('bg-light');
    this.document.body.classList.remove('pace-done');
  }

  OpenMenu(idMenu: number) {
    this.idMenu = (this.idMenu == idMenu) ? 0 : idMenu;
  }

}
