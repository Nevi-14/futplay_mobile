CREATE VIEW JUGADORES_EQUIPOS_VIEW AS
SELECT po.Cod_Posicion, po.Posicion, u.Avatar, u.Cod_Usuario, u.Nombre,u.Primer_Apellido,u.Segundo_Apellido,u.Foto , u.Estatura , u.Peso , u.Apodo , u.Partidos_Jugados , u.Partidos_Jugador_Futplay,
p.Cod_Provincia AS Cod_Provincia,   p.Provincia AS Provincia  ,
c.Cod_Canton AS Cod_Canton ,  c.Canton AS Canton, d.Cod_Distrito AS Cod_Distrito  , d.Distrito AS Distrito ,  e.Cod_Equipo,e.Abreviacion, e.Nombre as Nombre_Equipo, e.Foto as Foto_Equipo
FROM 
  Posiciones po,
  Jugadores_Equipos j,
Usuarios u,
	  Equipos e,
     Provincias p,
     Cantones c,
     Distritos d
	
WHERE 
po.Cod_Posicion = u.Cod_Posicion and
j.Cod_Equipo = e.Cod_Equipo and
e.Cod_Usuario = u.Cod_Usuario and
      e.Cod_Provincia = p.Cod_Provincia and
      e.Cod_Canton = c.Cod_Canton and
      c.Cod_Provincia = e.Cod_Provincia and
      e.Cod_Distrito = d.Cod_Distrito and
      e.Cod_Canton = d.Cod_Canton and
      e.Cod_Provincia = d.Cod_Provincia