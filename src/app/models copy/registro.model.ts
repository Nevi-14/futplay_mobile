/**
 * UN MODELO ES UNA CLASE QUE TIENE LAS PROPIEDADES Y METODOS PARA TRABAJAR UN REGISTRO DE ESCANEO
 */

export class Registro {
    public format : string;
    public text : string;
    public type : string;
    public icon : string;
    public created : Date;

    // el constructor es lo primieroque se va a ejecutar cuando cree unainstancia

    constructor (format:string,text:string){
        this.format = format;
        this.text = text;

        this.created = new Date();

        this.determinarTipo();

    }


    private determinarTipo(){
      
        const inicioTexto = this.text.substring(0,4);
        console.log('TIPO', inicioTexto)

        switch(inicioTexto){

            case 'http':
                this.type = 'http',
                this.icon = 'globe';
                break;
                case 'geo:':
                    this.type = 'geo',
                    this.icon = 'pin';
                    break;
                default:
                this.type = 'no reconocido';
                this.icon = 'create';

        }

    }
}