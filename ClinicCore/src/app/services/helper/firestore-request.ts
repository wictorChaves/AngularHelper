import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DocumentChangeAction, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { FirestoreData } from 'src/app/models/firestore-data.interface';

export class FirestoreRequest {

    protected collection: string = "";

    constructor(collection: string) {
        this.collection = collection;
    }

    FormatManyUid(unformatted: Observable<DocumentChangeAction<object>[]>): Observable<FirestoreData[]> {
        return unformatted.pipe(
            map(changes => {
                return changes.map(c => ({
                    uid: c.payload.doc.id,
                    data: c.payload.doc.data()
                }));
            })
        )
    }

    FormatUid(unformatted: Observable<Action<DocumentSnapshot<any>>>): Observable<FirestoreData> {
        return unformatted.pipe(
            map(c => ({
                uid: c.payload.id,
                data: c.payload.data()
            }))
        )
    }

}
