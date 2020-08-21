import { Auth } from "../models/auth.model";

export function isReceptionUser(auth: Auth) {
    if (auth == undefined)
        return false
    if (auth.token.reception !== true)
        return false
    return true
}