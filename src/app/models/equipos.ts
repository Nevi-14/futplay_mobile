
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
        public EstrellasAnteriores:number,
        public Dureza: string,
        public Posicion_Actual: number,
        public Puntaje_Actual: number,
        public Estado: boolean,
        public Descripcion_Estado: string,
        public Avatar:boolean,
        public Partidos_Ganados: number,
        public Partidos_Perdidos: number,
        public Goles_Favor : number,
        public Goles_Encontra :number,
        public Promedio_Altura_Jugadores : number,
        public Promedio_Peso_Jugadores :number,
        
    ){}
}
