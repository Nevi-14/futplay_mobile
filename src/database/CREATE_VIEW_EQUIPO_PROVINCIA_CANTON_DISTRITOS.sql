CREATE VIEW  USUARIO_EQUIPOS_PROVINCIAS_CANTONES_DISTRITOS AS

SELECT  b.Cod_Usuario AS Cod_Usuario , e.Avatar, b.Nombre AS Nombre_Usuario, e.Cod_Equipo, e.Nombre , e.Foto, e.Abreviacion, e.Fecha, e.Estrellas, e.EstrellasAnteriores , e.Dureza, e.Posicion_Actual,e.Partidos_Ganados,e.Partidos_Perdidos,e.Goles_Favor,e.Goles_Encontra,e.Promedio_Altura_Jugadores, e.Promedio_Peso_Jugadores,  e.Puntaje_Actual, e.Estado, e.Descripcion_Estado, p.cod_Provincia AS Cod_Provincia,   p.Provincia AS Nombre_Provincia  , c.Cod_Canton AS Cod_Canton ,  c.Canton AS Nombre_Canton, d.Cod_Distrito AS Cod_Distrito  , d.Distrito AS Nombre_Distrito 
FROM equipos e,
     usuarios b,
     Provincias p,
     Cantones c,
     Distritos d
WHERE
      e.Cod_Usuario = b.Cod_Usuario and
      e.Cod_Provincia = p.Cod_Provincia and
      e.Cod_Canton = c.Cod_Canton and
      e.Cod_Distrito = d.Cod_Distrito




CREATE VIEW  JUGADORES_EQUIPOS_PROVINCIAS_CANTONES_DISTRITOS AS

SELECT  e.Cod_Equipo, e.Nombre , e.Foto, e.Avatar, e.Abreviacion, e.Fecha, e.Estrellas,e.EstrellasAnteriores , e.Dureza, e.Posicion_Actual,e.Partidos_Ganados,e.Partidos_Perdidos,e.Goles_Favor,e.Goles_Encontra,e.Promedio_Altura_Jugadores, e.Promedio_Peso_Jugadores,  e.Puntaje_Actual, e.Estado, e.Descripcion_Estado, p.cod_Provincia AS Cod_Provincia,   p.Provincia AS Nombre_Provincia  , c.Cod_Canton AS Cod_Canton ,  c.Canton AS Nombre_Canton, d.Cod_Distrito AS Cod_Distrito  , d.Distrito AS Nombre_Distrito , j.Cod_Usuario, j.Cod_Equipo as Codigo_Equipo , j.Favorito, j.Administrador_Equipo


FROM equipos e,
	  Jugadores_Equipos j,
     Provincias p,
     Cantones c,
     Distritos d
WHERE
    
      e.Cod_Provincia = p.Cod_Provincia and
      e.Cod_Canton = c.Cod_Canton and
      e.Cod_Distrito = d.Cod_Distrito 
	  and e.Cod_Equipo = j.Cod_Equipo