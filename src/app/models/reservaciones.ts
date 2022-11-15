export class Reservaciones {
  constructor(
    public Cod_Reservacion:  number,
    public Cod_Cancha:  number,
    public Cod_Usuario:  number,
    public Cod_Estado:  number,
    public Reservacion_Externa:  boolean,
    public Titulo:  string,
    public Fecha:  Date,
    public Hora_Inicio:  string,
    public Hora_Fin:  string,
    public Dia_Completo: Boolean

  ){}
  
  }