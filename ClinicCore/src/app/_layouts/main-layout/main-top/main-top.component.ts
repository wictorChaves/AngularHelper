import { Component, OnInit } from '@angular/core';
import { AngularFireAuth }   from '@angular/fire/auth';
import { environment }       from 'src/environments/environment';
import { Router }            from '@angular/router';

@Component({
  selector   : 'app-main-top',
  templateUrl: './main-top.component.html',
  styleUrls  : ['./main-top.component.css']
})
export class MainTopComponent implements OnInit {

  constructor(
    private router: Router,
    public  afAuth: AngularFireAuth
  ) { }

  ngOnInit() { }

  Logout() {
    this.router.navigateByUrl('/logout');
  }

}