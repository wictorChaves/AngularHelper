import { Component, OnInit } from '@angular/core';
import { Form }              from './forms/form';
import { LoadingHelper }     from 'src/app/helper/loading-helper';
import { TypesExamService }  from 'src/app/services/types-exam.service';
import { Observable }        from 'rxjs';
import { FirestoreData }     from 'src/app/models/firestore-data.interface';
import { ActivatedRoute }    from '@angular/router';

@Component({
  selector   : 'app-request-exam',
  templateUrl: './request-exam.component.html',
  styleUrls  : ['./request-exam.component.css'],
  providers  : [
    Form,
    LoadingHelper
  ]
})
export class RequestExamComponent implements OnInit {

  public uidPatient: string = "";
  public types$    : Observable<FirestoreData[]>;

  constructor(
    public  formulario      : Form,
    public  loadingHelper   : LoadingHelper,
    private typesExamService: TypesExamService,
    private route           : ActivatedRoute
  ) {
    this.uidPatient = this.route.snapshot.parent.params['uid'];
    this.types$     = this.typesExamService.GetAll();
  }

  ngOnInit() {
    this.formulario.Build();
    this.formulario.BeforeSubmit.subscribe(this.loadingHelper.Start.bind(this.loadingHelper));
    this.formulario.AfterSubmit.subscribe(this.loadingHelper.Stop.bind(this.loadingHelper));
  }

}
