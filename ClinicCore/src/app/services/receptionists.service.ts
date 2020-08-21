import { Injectable }       from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { FirestoreRequest } from './helper/firestore-request';
import { FirestoreData }    from '../models/firestore-data.interface';
import { Receptionist }     from '../models/domain/receptionist.interface';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistsService extends FirestoreRequest {

  constructor(private afs: AngularFirestore) {
    super('receptionists');
  }

  public GetAll(): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection).snapshotChanges().pipe(this.FormatManyUid);
  }

  public GetById(uid: string): Observable<FirestoreData> {
    return this.afs.doc(this.collection + "/" + uid).snapshotChanges().pipe(this.FormatUid);
  }

  public Add(uid: string, data: Receptionist): Observable<void> {
    return from(this.afs.doc(this.collection + "/" + uid).set(data));
  }

  public Update(uid: string, data: any): Observable<void> {
    return from(this.afs.doc(this.collection + "/" + uid).update(data));
  }

}
