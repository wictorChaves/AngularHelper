import { Component, OnInit } from '@angular/core';
import { DoctorsService }    from 'src/app/services/doctors.service';
import { Form }              from './forms/form';
import { LoadingHelper }     from 'src/app/helper/loading-helper';
import { Observable }        from 'rxjs';
import { Message }           from 'src/app/models/message.model';
import { DatetimeHelper }    from 'src/app/helper/datetime-helper';
import { RoomsService }      from 'src/app/services/rooms.service';

@Component({
  selector   : 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls  : ['./mark.component.css'],
  providers  : [
    Form,
    LoadingHelper,
    DatetimeHelper
  ]

})
export class MarkComponent implements OnInit {

  public message$: Observable<Message>;
  public rooms$  : Observable<any[]> = this.roomsService.GetAll();
  public doctors : any[] = [];

  constructor(
    public  formulario    : Form,
    public  loadingHelper : LoadingHelper,
    public  datetimeHelper: DatetimeHelper,
    private doctorsService: DoctorsService,
    private roomsService  : RoomsService
  ) { }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));

    this.formulario.patchValue({
      date       : this.datetimeHelper.GetDateNow(),
      timeInitial: this.datetimeHelper.GetTimeNow(1),
      timeFinal  : this.datetimeHelper.GetTimeNow(2)
    });

    this.doctorsService.GetAll().subscribe(doctors => {
      this.doctors = doctors;
      this.formulario.patchValue({
        uidDoctor: doctors[0].uid
      });
    });

    this.rooms$.subscribe(rooms => {
      this.formulario.patchValue({
        uidRoom: rooms[0].uid
      });
    });

  }

}
