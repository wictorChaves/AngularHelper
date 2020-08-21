import { CallableContext } from "firebase-functions/lib/providers/https";
import { Auth } from "../models/auth.model";
import { buildMsgError, buildMsgResult } from "../functions/return-msgs";
import * as admin from 'firebase-admin';
import { User } from "../models/user.model";
import { isReceptionUser } from "../functions/reception-user";

export function createUserPatient(user: User, context: CallableContext) {

    if (!isReceptionUser(context.auth as Auth))
        return buildMsgError("Acesso Negado!")

    return admin.auth().createUser(user).then(async function (userRecord) {

        const rule = {
            patient: true
        };

        await admin.auth().createCustomToken(userRecord.uid, rule);
        await admin.auth().setCustomUserClaims(userRecord.uid, rule);

        return buildMsgResult(userRecord);

    }).catch(function (error) {
        return buildMsgError(error);
    });
}