export class Reservaciones {
    constructor(
  public Cod_Reservacion:  number,
  public Cod_Cancha:  number,
  public Cod_Usuario:  number,
  public Reservacion_Externa:  boolean,
  public Titulo:  string,
  public Fecha:  Date,
  public Hora_Inicio:  number,
  public Hora_Fin:  number,
  public Cod_Estado:  number,
  public diaCompleto: Boolean,
  public Descripcion:  string,
  public Canchas:  [],
  public Usuarios:  [],
  
    ){}
    
    }