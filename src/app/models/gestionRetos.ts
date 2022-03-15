export class GestionRetos{

    constructor(
        public Nombre_Cancha: string,
        public Abreviacion:string,
        public Cod_Reservacion: number,
        public Cod_Usuario: number,
        public  Descripcion: string,
        public Latitud: number,
        public Longitud: number,
        public Cod_Usuario_Rival: number,
        public Nombre_Rival: string,
        public Foto_Rival: string,
        public Foto_Retador: string,
        public  Nombre_Retador: string,
        public  Cod_Cancha: number,
        public  Titulo: string,
        public Fecha: Date,
        public  Hora_Inicio: string,
        public  Hora_Fin: string,
        public Estado_Reservacion: boolean,
        public Estado_Confirmacion: boolean,
        public  Cod_Retador: number,
        public Cod_Rival: number,
        public  Confirmacion_Retador: boolean,
        public Confirmacion_Rival: boolean,
        public Estado: boolean,
        public Luz: boolean,
        public  Precio_Hora: number,
        public Precio_Luz: number,
    ){

    }
}