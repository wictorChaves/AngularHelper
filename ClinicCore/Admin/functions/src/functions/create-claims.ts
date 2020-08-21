import * as admin from 'firebase-admin';

export async function addClaims(email: string, claims: object): Promise<void> {
    const user = await admin.auth().getUserByEmail(email);
    return admin.auth().setCustomUserClaims(user.uid, claims);
}