
export class Equipos {
    constructor(
     public    Cod_Equipo: number,
     public  Cod_Usuario: number,
     public  Avatar: boolean,
     public   Foto:string,
     public   Nombre: string,
     public  Abreviacion: string,
     public   Estrellas: number,
     public   Estrellas_Anteriores: number,
     public  Dureza: number,
     public   Posicion_Actual: number,
     public  Puntaje_Actual: number,
     public   Partidos_Ganados: number,
        public Partidos_Perdidos: number,
        public  Goles_Favor: number,
        public   Goles_Encontra: number,
        public  Promedio_Altura_Jugadores: number,
        public   Promedio_Peso_Jugadores: number,
        public   Estado: boolean,
        public   Descripcion_Estado: string
      

    ) { }
}
