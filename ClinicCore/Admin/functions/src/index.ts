import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { createUserAdmin } from './call-functions/create-user-admin';
import { createUserDoctor } from './call-functions/create-user-doctor';
import { createUserReception } from './call-functions/create-user-reception';
import { createUserPatient } from './call-functions/create-user-patient';

admin.initializeApp();

exports.createUserAdmin     = functions.https.onCall(createUserAdmin);
exports.createUserDoctor    = functions.https.onCall(createUserDoctor);
exports.createUserReception = functions.https.onCall(createUserReception);
exports.createUserPatient   = functions.https.onCall(createUserPatient);



