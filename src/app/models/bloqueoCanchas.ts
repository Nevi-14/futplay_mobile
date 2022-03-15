export class BloqueoCanchas {
    constructor(
public Cod_Reservacion:  number,
public Cod_Cancha:  number,
public Cod_Usuario:  number,
public Reservacion_Externa:  boolean,
public Titulo:  string,
public Fecha:  Date,
public Hora_Inicio:  string,
public Hora_Fin:  string,
public Estado:  boolean,
public diaCompleto: Boolean,
public Descripcion:  string,
public Luz: Boolean,
public Precio_Hora:  number,
public Precio_Luz:  number,
public Canchas:  [],
public Usuarios:  [],

    ){}
    
    }