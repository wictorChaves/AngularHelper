import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FireFunctionMsg {

    Get(request: any, valueDefault: string = ""): string {
        if (request['code'] == "permission-denied")
            return "Você não tem permissão para acessar esta página!"
        if (request['data'] != undefined)
            if (request.data['errorInfo'] != undefined)
                switch (request.data['errorInfo']['code']) {
                    case ("auth/invalid-password"): 
                        return "A senha deve ter pelo menos 6!";
                    case ("auth/email-already-exists"): 
                        return "Usuário já existe!";
                    default: 
                        return valueDefault;
                }
        return valueDefault;
    }

}
