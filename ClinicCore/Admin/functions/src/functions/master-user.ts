import { Auth } from "../models/auth.model";

export function isMasterUser(auth: Auth): boolean {
    if (auth == undefined)
        return false
    if (auth.token.email === "cogumelo.oliveira@gmail.com")
        if (auth.token.firebase.sign_in_provider === "google.com")
            return true;
    return false
}