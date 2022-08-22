export class ListaCanchas {
    constructor(
    public Cod_Categoria: number,
    public Categoria:string,
    public Categoria_Canchas:  string,
    public Cod_Cancha: number,
    public Cod_Provincia: number,
    public Nombre_Provincia: string,
    public Cod_Canton: number,
    public Nombre_Canton: string,
    public Cod_Distrito: number,
    public Nombre_Distrito: string,
    public Telefono: string,
    public Nombre:  string,
    public Foto: string,
    public Precio_Hora: number,
    public techo: boolean,
    public Luz: boolean,
    public Precio_Luz: number,
    public Estado: boolean,
    public Numero_Cancha: string,
    public Latitud: number,
    public Longitud: number,
    public Fecha: number,
    public Cod_Usuario: number

    ){}
    
    }