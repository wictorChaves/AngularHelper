import { CallableContext } from "firebase-functions/lib/providers/https";
import { Auth } from "../models/auth.model";
import { buildMsgError, buildMsgResult } from "../functions/return-msgs";
import * as admin from 'firebase-admin';
import { User } from "../models/user.model";
import { isAdminUser } from "../functions/admin-user";

export function createUserReception(user: User, context: CallableContext) {

    if (!isAdminUser(context.auth as Auth))
        return buildMsgError("Acesso Negado!")

    return admin.auth().createUser(user).then(async function (userRecord) {

        const rule = {
            reception: true
        };

        await admin.auth().createCustomToken(userRecord.uid, rule);
        await admin.auth().setCustomUserClaims(userRecord.uid, rule);

        return buildMsgResult(userRecord);

    }).catch(function (error) {
        return buildMsgError(error);
    });
}