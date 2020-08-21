import { StorageDefault } from './storage-default.interface';
import { Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

export class LocalStorage implements StorageDefault {

    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

    public getItem(key: any) {
        return this.storage.get(key);
    }

    public setItem(key: any, value: any): void {
        this.storage.set(key, value);
    }

}