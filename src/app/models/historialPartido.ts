
export class HistorialPartido {
    constructor(
       public  Cod_Partido : number,
       public  Cod_Reservacion: number,
       public  Verificacion_QR_Retador: boolean,
       public  Verificacion_QR_Rival : boolean,
       public Goles_Retador : number,
       public  Goles_Rival : number,
       public  Dureza_Rival: string,
       public  Dureza_Retador : string,
       public Reservaciones: [],
       public Historial_Partidos_Jugador: []
    ){}
}
