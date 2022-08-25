
Tomar en cuenta las reservaciones con la fecha  mayor o igual a la actual.
En caso de excluir los estados 4,5,8 se puede borrar todo
En caso de que ya haya pasado la reservacion se puede borrar.

Se borra todo 

reservaciones   : Cod_Usuario
Confirmacion_Reservaciones : Cod_Reservacion 
Factura_Detalle_Reservaciones : Cod_Reservacion 
Historial_Partidos : Cod_Reservacion 



En caso de tener algn estado 4,5,8  se desactiva y se manda correo pasa a estado 8 y se mantiene todo hasta que se revise por completo 


reservaciones   : Cod_Usuario
Confirmacion_Reservaciones : Cod_Reservacion 
Factura_Detalle_Reservaciones : Cod_Reservacion 
Historial_Partidos : Cod_Reservacion 


https://futplaycompany.com/FUTPLAY_APIS_HOST/api/borrar/equipo/reservaciones/?Cod_Equipo=27


Equipos Cod_Usuario
Jugadores_Equipos Cod_Equipo
Solicitudes_Jugadores_Equipos Cod_Equipo
Confirmacion_Reservaciones Cod_Retador Cod_Rival  Cod_Reservacion != 4, 5 , 8 delete
Historial_Partidos Cod_Equipo  Cod_Reservacion != 4, 5 , 8 delete
Historial_Partidos_Equipos Cod_Equipo