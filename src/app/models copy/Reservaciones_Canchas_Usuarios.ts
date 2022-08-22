export class ReservacionesCanchasUsuarios {
    constructor(
    public Cod_Reservacion:  number,
    public Cod_Usuario:  number,
    public Nombre_Usuario: string,
    public Usuario_Primer_Apellido: string,
    public Usuario_Segundo_Apellido: string,
    public Foto: string,
    public Cod_Cancha: number,
    public Nombre_Cancha: string,
    public Reservacion_Externa: Boolean,
    public Numero_Cancha: string,
    public Titulo: string,
    public Precio_Hora: number,
    public Fecha: Date,
    public Hora_Inicio: number,
    public Hora_Fin: number,
    public Estado: Boolean,
    public diaCompleto: Boolean,
    public Descripcion: string,
    
    ){}
    
    }