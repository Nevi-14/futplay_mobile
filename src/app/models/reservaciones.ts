export class Reservaciones {
  constructor(
    public Cod_Reservacion:  number,
    public Cod_Cancha:  number,
    public Cod_Moneda:number,
    public Cod_Usuario:  number,
    public Cod_Tipo:number,
    public Cod_Estado:  number,
    public Reservacion_Externa:  boolean,
    public Titulo:  string,
    public Detalle:  string,
    public Fecha:  any,
    public Hora_Inicio:  any,
    public Hora_Fin:  any,
    public Dia_Completo: Boolean

  ){}
  
  }