export class EventoHelper {

    public target;

    constructor(event) {
        this.target = this.getTarget(event);
    }

    getTarget(event){
        return event.target || event.srcElement || event.currentTarget;
    }

    addClass(classe: string) {
        if(this.existClass(classe)) return;
        var classes = this.target.attributes.class.nodeValue;
        this.target.setAttribute('class', classes + ' ' + classe);
    }

    removeClass(classe: string) {
        var classes = this.target.attributes.class.nodeValue;
        var arrayClasses = classes.split(" ");
        var index = arrayClasses.indexOf(classe);
        arrayClasses.splice(index, 1);
        if(arrayClasses.indexOf(classe) != -1) this.removeClass(classe);
        this.target.setAttribute('class', arrayClasses.join(' '));
    }

    existClass(classe){
        var classes = this.target.attributes.class.nodeValue;
        var arrayClasses = classes.split(" ");
        return arrayClasses.indexOf(classe) != -1;
    }



}
