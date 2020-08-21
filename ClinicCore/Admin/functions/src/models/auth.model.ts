import * as firebase from 'firebase-admin';

export interface Auth {
    uid: string;
    token: firebase.auth.DecodedIdToken;
}