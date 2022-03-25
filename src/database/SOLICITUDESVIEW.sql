CREATE VIEW SOLICITUDES_VIEW AS

select s.Cod_Solicitud, s.Cod_Usuario, s.Cod_Equipo as Cod_Equipo, s.Confirmacion_Usuario, s.Confirmacion_Equipo, s.Fecha , s.Estado, u.Nombre as Nombre_Jugador,
u.Primer_Apellido, u.Foto as Foto_Jugador, e.Nombre as Nombre_Equipo, e.Foto as Equipo_Foto from  usuarios as u inner join 
Solicitudes_Jugadores_Equipos  as s on u.Cod_Usuario = s.Cod_Usuario
inner join equipos as e on s.Cod_Equipo = e.Cod_Equipo