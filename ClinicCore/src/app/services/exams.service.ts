import { Injectable }                          from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from }                    from 'rxjs';
import { FirestoreRequest }                    from './helper/firestore-request';
import { FirestoreData }                       from '../models/firestore-data.interface';
import { Exam }                                from '../models/domain/exam.interface';

@Injectable({
  providedIn: 'root'
})
export class ExamsService extends FirestoreRequest {

  constructor(private afs: AngularFirestore) {
    super('exams');
  }

  public GetAll(): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection).snapshotChanges().pipe(this.FormatManyUid);
  }

  public GetByUidPatient(uidPatient: string): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection, ref => ref.where('uidPatient', '==', uidPatient)).snapshotChanges().pipe(this.FormatManyUid);
  }

  public GetById(uid: string): Observable<FirestoreData> {
    return this.afs.doc(this.collection + "/" + uid).snapshotChanges().pipe(this.FormatUid);
  }

  public Add(data: Exam): Observable<DocumentReference> {
    return from(this.afs.collection(this.collection).add(data));
  }

  public Update(uid: string, data: any): Observable<void> {
    return from(this.afs.doc(this.collection + "/" + uid).update(data));
  }

}
