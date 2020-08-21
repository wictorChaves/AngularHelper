import { StorageDefault } from './storage-default.interface';

export class MemoryStorage implements StorageDefault {

    private _cache: any[] = [];

    public getItem(key: any) {
        return this._cache[key];
    }

    public setItem(key: any, value: any): void {
        this._cache[key] = value;
    }

}