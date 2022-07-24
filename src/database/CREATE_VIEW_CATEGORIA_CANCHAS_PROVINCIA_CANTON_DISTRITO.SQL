CREATE VIEW  CATEGORIA_CANCHAS_PROVINCIAS_CANTONES_DISTRITOS AS

SELECT b.Cod_Usuario AS Cod_Usuario , b.Nombre AS Nombre_Usuario, a.Cod_Cancha, e.Cod_Categoria, e.Nombre AS Categoria, p.cod_Provincia AS Cod_Provincia,   p.Provincia AS Nombre_Provincia  , c.Cod_Canton AS Cod_Canton ,  c.Canton AS Nombre_Canton, d.Cod_Distrito AS Cod_Distrito  , d.Distrito AS Nombre_Distrito , a.Nombre , a.Foto, a.Numero_Cancha, a.Telefono, 
a.Precio_Hora, a.techo, a.Luz ,a.Precio_Luz, a.Estado, a.Fecha, a.Latitud, a.Longitud , a.Descripcion_Estado
FROM Canchas a,
     usuarios b,
	 Categoria_Canchas e,
     Provincias p,
     Cantones c,
     Distritos d
WHERE
      a.Cod_Usuario = b.Cod_Usuario and
	   a.Cod_Categoria = e.Cod_Categoria and
      a.Cod_Provincia = p.Cod_Provincia and
      a.Cod_Canton = c.Cod_Canton and
      a.Cod_Distrito = d.Cod_Distrito