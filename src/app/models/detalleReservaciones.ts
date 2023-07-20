
export class DetalleReservaciones {
    constructor(
        public Cod_Detalle: number,
        public Cod_Reservacion: number,
        public Cod_Moneda: number,
        public Cod_Estado: number,
        public Cod_Retador: number,
        public Cod_Rival: number,
        public Confirmacion_Rival: boolean,
        public Luz: boolean,
        public Monto_Luz: number,
        public Total_Horas: number,
        public Precio_Hora: number,
        public Cod_Descuento: string,
        public Porcentaje_Descuento: number,
        public Monto_Descuento: number,
        public Porcentaje_Impuesto: number,
        public Monto_Impuesto: number,
        public Porcentaje_FP: number,
        public Monto_FP: number ,
        public Monto_Equipo: number ,
        public Monto_Sub_Total: number ,
        public Monto_Total: number ,
        public Pendiente: number ,
        public Notas_Estado: string 
   
    ){}
}
