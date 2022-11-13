import { IUserModel } from "./iuser.model";

export interface IMessageModel {
  message: string;
  user   : IUserModel;
  date   : number;
}