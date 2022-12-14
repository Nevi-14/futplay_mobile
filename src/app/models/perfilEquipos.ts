
export class PerfilEquipos {
    constructor(
        public nombre:string, 
     public equipo : {
            Cod_Equipo: number,
            Cod_Usuario: number,
            Cod_Provincia: number,
            Cod_Canton: number,
            Cod_Distrito: number,
            Avatar: boolean,
            Foto:string,
            Nombre: string,
            Abreviacion: string,
            Estrellas: number,
            Estrellas_Anteriores: number,
            Dureza: string,
            Posicion_Actual: number,
            Puntaje_Actual: number,
            Partidos_Ganados: number,
            Partidos_Perdidos: number,
            Goles_Favor: number,
            Goles_Encontra: number,
            Promedio_Altura_Jugadores: number,
            Promedio_Peso_Jugadores: number,
            Estado: boolean,
            Descripcion_Estado: string,
            created_at: Date,
            updated_at: Date
        },
       public  provincia:string,
       public  canton : string,
       public  distrito: string,
       public  correo: string
        
    ){}
}
