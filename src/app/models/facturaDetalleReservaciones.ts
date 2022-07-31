export class FacturaDetaleReservaciones {
    constructor(
    public ID :  number,
    public Cod_Reservacion  :  number,
    public Cod_Pago_Retador : string,
    public Cod_Descuento : string,
    public Cod_Pago_Rival : string,
    public Impuesto  :  number,
    public Monto_Impuesto   :  number,
    public Descuento  : number,
    public Monto_Descuento  : number,
    public Precio_Hora   :  number,
    public Luz: boolean,
    public Porcentaje_FP : number,
    public Monto_FP : number,
    public Precio_Luz   :  number,
    public Monto_Subtotal  : number,
    public Monto_Total  : number,
    public Total_Horas: number,
    public Monto_Equipo  : number,
    public Monto_Abonado_Retador   :  number,
    public Monto_Abonado_Rival    :  number,
    public Monto_Pendiente_Retador   : number,
    public Monto_Pendiente_Rival   : number,
    public Estado   : boolean,
    public Notas_Estado    : string
    ){}
    
    }