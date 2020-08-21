import { StorageDefault }                  from './storage-default.interface';
import { Inject }                          from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

export class SessionStorage implements StorageDefault {

    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

    public getItem(key: any) {
        return this.storage.get(key);
    }

    public setItem(key: any, value: any): void {
        this.storage.set(key, value);
    }

    public removeItem(key: any): void {
        this.storage.remove(key);
    }

}