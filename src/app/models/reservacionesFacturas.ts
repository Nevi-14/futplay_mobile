export class ReservacionesFacturas{
    constructor(
      public reservacionFacturaID: number,
     public reservacionID: number,
     public horas: number,
     public precioHora: number,
     public montoTotal: number,
     public montoAbonado: number,
     public montoPendiente: number,
     public estado: string

    ){}
}