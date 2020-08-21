import { Injectable }                          from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from }                    from 'rxjs';
import { FirestoreRequest }                    from './helper/firestore-request';
import { FirestoreData }                       from '../models/firestore-data.interface';
import { Medicine }                            from '../models/domain/medicine.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicineService extends FirestoreRequest {

  constructor(private afs: AngularFirestore) {
    super('medicine');
  }

  public GetAll(): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection).snapshotChanges().pipe(this.FormatManyUid);
  }

  public GetById(uid: string): Observable<FirestoreData> {
    return this.afs.doc(this.collection + "/" + uid).snapshotChanges().pipe(this.FormatUid);
  }

  public Add(data: Medicine): Observable<DocumentReference> {
    return from(this.afs.collection(this.collection).add(data));
  }

  public Update(uid: string, data: any): Observable<void> {
    return from(this.afs.doc(this.collection + "/" + uid).update(data));
  }

}
