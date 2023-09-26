export class ConfirmacionPagos {
constructor(
public Id:  number,
public Confirmacion_Pago: string,
public Cod_Reservacion:  number,
public Cod_Equipo:  number,
public Codigo_Descuento: string,
public Porcentaje_Descuento: number,
public Monto_Descuento: number,
public Monto: number,
public Monto_Pago:number,
public Estado: boolean
){}

}