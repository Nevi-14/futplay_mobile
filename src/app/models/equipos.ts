
export class Equipos {
    constructor(
        public Cod_Equipo: number,
        public Cod_Usuario: number,
        public Cod_Provincia: number,
        public Cod_Canton: number,
        public Cod_Distrito: number,
        public Foto: string,
        public Nombre: string,
        public Abreviacion: string,
        public Fecha: Date,
        public Estrellas: number,
        public Dureza: string,
        public Posicion_Actual: number,
        public Puntaje_Actual: number,
        public Estado: boolean,
        public Descripcion_Estado: string,
        public Avatar:boolean
    ){}
}
