export class LoadingHelper {

    private _flag = false;
    private _class = 'loading';

    public Class() {
        return this._flag ? this._class : '';
    }

    public IsLoading() {
        return this._flag;
    }

    public Start() {
        this._flag = true;
    }

    public Stop() {
        this._flag = false;
    }

}
