import { UserInfo } from 'firebase';

export interface UserLogged {
    userInfo: UserInfo;
    claims: object;
}