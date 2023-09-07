
export class PerfilEquipos {
    constructor(
        public nombre:string, 
     public equipo : {
            Cod_Equipo: number,
          Cod_Usuario: number,
          Avatar: boolean,
           Foto:string,
           Nombre: string,
          Abreviacion: string,
           Estrellas: number,
           Estrellas_Anteriores: number,
          Dureza: number,
           Posicion_Actual: number,
          Puntaje_Actual: number,
           Partidos_Ganados: number,
            Partidos_Perdidos: number,
             Goles_Favor: number,
              Goles_Encontra: number,
             Promedio_Altura_Jugadores: number,
              Promedio_Peso_Jugadores: number,
              Estado: boolean,
              Descripcion_Estado: string
        },
        public pais : string,
        public  estado:string,
        public  ciudad : string,
       public  correo: string
        
    ){}
}
