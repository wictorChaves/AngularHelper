import { Component, OnInit } from '@angular/core';
import { AngularFireAuth }   from '@angular/fire/auth';
import { Router }            from '@angular/router';
import * as firebase         from 'firebase/app';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public  angularFireAuth: AngularFireAuth,
    private router         : Router
  ) { }

  ngOnInit() { }

  login() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      this.router.navigateByUrl('/chat');
    }, error => { console.log(error); });
  }

}
