export abstract class Rules {

    private _errorMsg = "";
    private _isValid  = true;

    public IsValid() {
        return this._isValid;
    }

    public GetErrorMsg() {
        return this._errorMsg;
    }

    protected _setError(msg: string) {
        this._errorMsg = msg;
        this._setIsvalid(false);
    }

    protected _setIsvalid(status: boolean) {
        this._isValid = status;
    }

    protected _between(current: number, initial: number, final: number): boolean {
        return (initial <= current) && (current <= final);
    }

    protected _timestampToWeekDay(timestamp) {
        var dateObj = new Date();
        dateObj.setTime(timestamp * 1000);
        return dateObj.getDay();
    }

}