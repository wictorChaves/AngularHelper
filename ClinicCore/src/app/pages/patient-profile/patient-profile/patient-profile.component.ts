import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';
import { Observable } from 'rxjs';
import { FirestoreData } from 'src/app/models/firestore-data.interface';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  public uidPatient: string = "";
  public patient$: Observable<FirestoreData>

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService
  ) { }

  ngOnInit() {
    this.uidPatient = this.route.snapshot.params['uid'];
    this.patient$ = this.patientsService.GetById(this.uidPatient);
  }

}
