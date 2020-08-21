import { Component, OnInit } from '@angular/core';
import { Store }             from '@ngrx/store';
import { UserLogged }        from 'src/app/models/user-logged.interface';
import { Logout }            from 'src/app/store/actions/user-logged.actions';
import { environment }       from 'src/environments/environment';
import { Router }            from '@angular/router';

@Component({
  selector   : 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls  : ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    public  store : Store<UserLogged>
  ) { }

  ngOnInit() {
    this.store.dispatch(new Logout());
    this.router.navigateByUrl("/login");
  }

}
