import { Component, OnInit } from '@angular/core';
import { ExamsService }      from 'src/app/services/exams.service';
import { Observable }        from 'rxjs';
import { FirestoreData }     from 'src/app/models/firestore-data.interface';
import { ActivatedRoute }    from '@angular/router';
import { TypesExamService }  from 'src/app/services/types-exam.service';
import { Location }          from '@angular/common';

@Component({
  selector   : 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls  : ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {

  public uid       : string = "";
  public uidPatient: string = "";
  public exam$     : Observable<FirestoreData>;
  public types$    : Observable<FirestoreData[]>;

  constructor(
    private typesExamService: TypesExamService,
    private examsService    : ExamsService,
    private route           : ActivatedRoute,
    private location     : Location
  ) {
    this.uid        = this.route.snapshot.params['uid'];
    this.uidPatient = this.route.snapshot.parent.params['uid'];
    this.exam$      = this.examsService.GetById(this.uid);
    this.types$     = this.typesExamService.GetAll();
  }

  ngOnInit() {}

  GoBack() {
    this.location.back();
  }

}
