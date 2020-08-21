export class DynamicFormFormatter {

    protected values: any[];

    constructor(values: any[]){
        this.values = values;
    }
    
    public Sanitize(field: string, func: Function) {
        if (this.HasProperty(this.values, field))
            this.values[field] = func(this.values[field]);
    }

    public HasProperty(obj: object, property: string) {
        return (property in obj);
    }

}
