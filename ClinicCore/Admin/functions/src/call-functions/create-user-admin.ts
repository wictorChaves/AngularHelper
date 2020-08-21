import { CallableContext } from "firebase-functions/lib/providers/https";
import { Auth } from "../models/auth.model";
import { isMasterUser } from "../functions/master-user";
import { buildMsgError, buildMsgResult } from "../functions/return-msgs";
import * as admin from 'firebase-admin';
import { User } from "../models/user.model";

export function createUserAdmin(user: User, context: CallableContext) {

    if (!isMasterUser(context.auth as Auth))
        return buildMsgError("Acesso Negado!")

    return admin.auth().createUser(user).then(async function (userRecord) {

        const rule = {
            admin: true
        };

        await admin.auth().createCustomToken(userRecord.uid, rule);
        await admin.auth().setCustomUserClaims(userRecord.uid, rule);

        return buildMsgResult(userRecord);

    }).catch(function (error) {
        return buildMsgError(error);
    });
}