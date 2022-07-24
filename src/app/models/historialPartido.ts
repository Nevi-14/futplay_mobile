
export class HistorialPartido {
    constructor(
       public  Cod_Partido : number,
       public  Cod_Reservacion: number,
       public  Cod_Equipo  : number,
       public  Verificacion_QR   : boolean,
       public Goles_Retador : number,
       public  Goles_Rival : number,
       public Estado: boolean,
       public Evaluacion : boolean
    ){}
}
