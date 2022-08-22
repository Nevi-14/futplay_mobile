export class Canchas {
    constructor(
    public Cod_Cancha:  number,
    public Cod_Usuario:  number,
    public Cod_Provincia: number,
    public Cod_Canton: number,
    public Cod_Distrito: number,
    public Cod_Categoria: number,
    public Foto: string,
    public Nombre: string,
    public Numero_Cancha: string,
    public Telefono: string,
    public Precio_Hora: number,
    public Luz: boolean,
    public Precio_Luz: number,
    public techo: boolean,
    public Latitud: number,
    public Longitud: number,
    public Fecha: number,
    public Estado: boolean,
    public Descripcion_Estado: string,
    public Bloqueo_Canchas: [],
    public Categoria_Canchas: [],
    public Provincias: [],
    public Cantones: [],
    public Distritos: [],
    public Usuarios: [],
    public Reservaciones: []
    ){}
    
    }