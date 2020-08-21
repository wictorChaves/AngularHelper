import * as admin from 'firebase-admin';
import { buildMsgError, buildMsgResult } from "./return-msgs";
import { addClaims } from "./create-claims";

export async function addRule(email: string, rule: object) {
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().createCustomToken(userRecord.uid, rule);
        await addClaims(email, rule);
        return buildMsgResult(`O usuário com o e-mail ${email} tem a seguinte regra "${Object.keys(rule)[0]}" agora`);
    }
    catch (error) {
        return buildMsgError(error);
    }
}