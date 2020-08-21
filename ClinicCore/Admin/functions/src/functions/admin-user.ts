import { Auth } from "../models/auth.model";

export function isAdminUser(auth: Auth): boolean {
    if (auth == undefined)
        return false
    if (auth.token.admin !== true)
        return false
    return true
}