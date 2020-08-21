import { Component, OnInit }    from '@angular/core';
import { Observable }           from 'rxjs';
import { UserLogged }           from './models/user-logged.interface';
import { UserLoggedService }    from './services/user-logged.service';
import { Store, select }        from '@ngrx/store';
import { Message }              from './models/message.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Clinic Core';
  _userLogged$: Observable<UserLogged>;
  _message$   : Observable<Message>;

  constructor(
    private userLoggedService   : UserLoggedService,
    public  store               : Store<UserLogged>,
    private notificationsService: NotificationsService,
    private StoreMessage        : Store<Message>
  ) {
    this._userLogged$ = this.store.pipe(select('UserLogged'));
    this._message$    = this.StoreMessage.pipe(select('message'));
  }

  ngOnInit(): void {
    this.userLoggedService.LoadUser();
    this._userLogged$.subscribe(user => {
      if (user === null)
        this.userLoggedService.Logout();
    });
    this._message$.subscribe(message => {
      if (message != undefined)
        switch (message.type) {
          case ("success"): 
            this.notificationsService.success(message.title, message.message)
            break;
          case ("error"): 
            this.notificationsService.error(message.title, message.message)
            break;
          default: 
            this.notificationsService.info(message.title, message.message)
            break;
        }
    })
  }

}
