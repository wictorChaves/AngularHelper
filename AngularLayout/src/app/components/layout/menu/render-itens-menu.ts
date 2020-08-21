export class RenderItensMenu {

    itens = []

    constructor(){
        this.itens = [ 
            { 'title':'Home',         'router':'/home',         'icon': 'home' },
            { 'title':'Loading',      'router':'/loading',      'icon': 'loop' },
            { 'title':'Formulario',   'sub': this.formulario(), 'icon': 'screen-desktop' },
            { 'title':'Norificações', 'router':'/notificacoes', 'icon': 'layers' },
            { 'title':'Alertas',      'router':'/alertas',      'icon': 'info' }
          ]
    }

    formulario(){
        return [
          { 'title':'Padrão',       'router':'/formulario' },
          { 'title':'Arquivo',      'router':'/formulario-file' },
          { 'title':'Select Multi', 'router':'/formulario-select-multi' },
          { 'title':'Select Load',  'router':'/formulario-select-load' },
          { 'title':'Datepicker',   'router':'/formulario-datepicker' }
        ]
    }
    
}
