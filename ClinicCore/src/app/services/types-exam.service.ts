import { Injectable }       from '@angular/core';
import { FirestoreRequest } from './helper/firestore-request';
import { Observable }       from 'rxjs';
import { FirestoreData }    from '../models/firestore-data.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TypesExamService extends FirestoreRequest {

  constructor(private afs: AngularFirestore) {
    super('types-exam');
  }

  public GetAll(): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection).snapshotChanges().pipe(this.FormatManyUid);
  }

}
