import { Injectable }                          from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from }                    from 'rxjs';
import { FirestoreRequest }                    from './helper/firestore-request';
import { FirestoreData }                       from '../models/firestore-data.interface';
import { Room }                                from '../models/domain/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends FirestoreRequest {

  constructor(private afs: AngularFirestore) {
    super('rooms');
  }

  public GetAll(): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection).snapshotChanges().pipe(this.FormatManyUid);
  }

  public GetById(uid: string): Observable<FirestoreData> {
    return this.afs.doc(this.collection + "/" + uid).snapshotChanges().pipe(this.FormatUid);
  }

  public Add(data: Room): Observable<DocumentReference> {
    return from(this.afs.collection(this.collection).add(data));
  }

  public Update(uid: string, data: any): Observable<void> {
    return from(this.afs.doc(this.collection + "/" + uid).update(data));
  }

}
