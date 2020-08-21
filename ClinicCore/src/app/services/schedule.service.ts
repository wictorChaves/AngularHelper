import { Injectable }                          from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from }                    from 'rxjs';
import { FirestoreRequest }                    from './helper/firestore-request';
import { FirestoreData }                       from '../models/firestore-data.interface';
import { DatetimeHelper }                      from '../helper/datetime-helper';
import { Schedule }                            from '../models/domain/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends FirestoreRequest {

  constructor(
    private afs           : AngularFirestore,
    private datetimeHelper: DatetimeHelper
  ) {
    super('schedule');
  }

  public GetAll(): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection, ref => ref.orderBy('timeInitial')).snapshotChanges().pipe(this.FormatManyUid);
  }

  public GetStatingCurrentDate(): Observable<FirestoreData[]> {
    return this.afs.collection(this.collection, ref => ref.where('datetimeInitial', '>=', this.datetimeHelper.GetTodayTimestamp())).snapshotChanges().pipe(this.FormatManyUid);
  }

  public GetById(uid: string): Observable<FirestoreData> {
    return this.afs.doc(this.collection + "/" + uid).snapshotChanges().pipe(this.FormatUid);
  }

  public Add(data: any): Observable<DocumentReference> {
    return from(this.afs.collection(this.collection).add(data));
  }

  public Update(uid: string, data: any): Observable<void> {
    return from(this.afs.doc(this.collection + "/" + uid).update(data));
  }

}
