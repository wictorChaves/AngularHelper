import { Component, OnInit } from '@angular/core';
import { ExamsService }      from 'src/app/services/exams.service';
import { Observable }        from 'rxjs';
import { FirestoreData }     from 'src/app/models/firestore-data.interface';
import { ActivatedRoute }    from '@angular/router';
import { Form }              from './forms/form';
import { LoadingHelper }     from 'src/app/helper/loading-helper';
import { TypesExamService }  from 'src/app/services/types-exam.service';

@Component({
  selector   : 'app-result-exam',
  templateUrl: './result-exam.component.html',
  styleUrls  : ['./result-exam.component.css'],
  providers  : [
    Form,
    LoadingHelper
  ]
})
export class ResultExamComponent implements OnInit {

  public uid       : string = "";
  public uidPatient: string = "";
  public exam$     : Observable<FirestoreData>;
  public types$    : Observable<FirestoreData[]>;

  constructor(
    public  formulario      : Form,
    public  loadingHelper   : LoadingHelper,
    private typesExamService: TypesExamService,
    private examsService    : ExamsService,
    private route           : ActivatedRoute
  ) {
    this.uid        = this.route.snapshot.params['uid'];
    this.uidPatient = this.route.snapshot.parent.params['uid'];
    this.exam$      = this.examsService.GetById(this.uid);
    this.types$     = this.typesExamService.GetAll();
  }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
    this.exam$.subscribe(firestoreData => {
      this.formulario.patchValue(firestoreData.data);
    })
  }

}