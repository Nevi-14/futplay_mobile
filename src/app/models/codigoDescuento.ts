export class CodigosDescuento {
constructor(
public Id:  number,
public Codigo_Descuento:  string,
public Porcentaje: number,
public Fecha_Inicio: Date,
public Fecha_Fin: Date,
public Estado: boolean
){}

}