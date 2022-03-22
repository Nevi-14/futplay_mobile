// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  maxCharCodigoProd: 6,
  adminClave: '123456',
  preURL: 'https://dev-coding.com/FUTPLAY_APIS_HOST/api/',
  preURL2: 'https://dev-coding.com/FUTPLAY_APIS_HOST/',
  TestURL: '',
  postURL: '',
  provinciasURL: 'Provincias',
  cantonesURL: 'Cantones',
  distritosURL: 'Distritos',
  usuariosURL: 'Usuarios/',
  retosEnviadosURL:'reservaciones-enviadas',
  retosRecibidosURL:'reservaciones-recibidas',
  equiposURL: 'Equipos/',
  canchasURL: 'Canchas/',
  categoriaCanchasURL: 'Categoriacanchas/',
  bloqueoCanchasURL: 'reservaciones',
  confirmacionReservacionesURL: 'confirmacionReservaciones',
  bloqueoCanchaGet: 'bloqueo/canchas',
  reservacionesUrl: 'Reservaciones/',
  codUsuarioParam:'?Cod_Usuario=',
  partidoActualURL: 'partido-actual/',
  iniciarPartidoURL: 'iniciar-partido/',
  actualizarQrURL: 'actualizar-qr/',
  evaluacionJugador:'evaluacion-jugador/',
  evaluacionEquipo:'evaluacion-equipo/',
  actualizarPartidoURL: 'actualizar-partido/',
  codUsuarioSecondParam:'&Cod_Usuario=',
  loginURL: 'login',
  correoParam:'?correo=',
  contrasenaPatam:'&contrasena=',
  codCanchaParam:'?Cod_Cancha=',
  codEquipoParam:'?Cod_Equipo=',
  canchaUsuarioParam:'cancha/usuario',
  perfilCancha:'perfil-cancha/',
  perfilUsuario:'perfil-usuario/',
  horarioCanchasUrl:'horario/cancha',
  actualizaHorarrioCanchaURL: 'actualizar/horario/cancha',
  jugadoresEquiposURL:'jugadores-equipos/',
  reservacionesFecha: 'reservaciones/fecha',
reservacionesFechaHora: 'reservaciones/fecha/hora',
canchasURLParam: 'cancha/usuario',
reservacionesFechaHoraInicio: 'reservaciones/fecha/hora/inicio',
reservacionesFechaHoraFin: 'reservaciones/fecha/hora/fin',
deleteReservacionesURL:'Reservaciones/',
codReservacion:'?Cod_Reservacion=',
fechaParam: '&Fecha=',
horaInicio:'&Hora_Inicio=',
horaFin:'&Hora_Fin=',
  Cod_Provincia:'?Cod_Provincia=',
  Cod_Provincia_Param:'&Cod_Provincia=',
  Cod_Canton:'?Cod_Canton=',
  Cod_Canton_Param:'&Cod_Canton=',
  Cod_Distrito:'?Cod_Distrito=',
  Cod_Distrito_Param:'&Cod_Distrito=',
 SolicitudesEquiposURL:'solicitudes-equipos/',
 SolicitudesJugadoresURL:'solicitudes-jugadores/',
 SolicitudesJugadoresEquiposPostURL:'solicitud-jugadores-equipos',
 jugadoresEquiposPostURL:'jugadores-equipos',
 SolicitudesJugadoresEquiposPutURL:'solicitud-jugadores-equipos',
 SolicitudesJugadoresEquiposDeleteURL:'solicitud-jugadores-equipos/',
 codSolicitudParam:'?Cod_solicitud=',
  codReservacionParam:'&Cod_Reservacion=',


  mapboxKey:'pk.eyJ1IjoibWhlcnJhIiwiYSI6ImNrcWxhdXk4eTByMDUyd28xNnZ2b2hoMjMifQ.IrIAxPGO4oFiRVR8U5sqkA',
  prdMode: false,
 // url:'http://192.168.178.30:3000'
 perfilUsuarioURL:'perfil-usuario/',
 perfilCanchaURL:'perfil-cancha/',
 perfilEquipoURL:'perfil-equipo/',
 misEquiposURL:'mis-equipos/',
 misCanchasURL:'mis-canchas/',
 reservacionesRecibidasUrl:'reservaciones-recibidas',
 reservacionesEnviadasUrl:'reservaciones-enviadas',
 reservacionesConfirmadasUrl:'reservaciones-confirmadas',
 actualizarReservacionURL:'actualizar-reservacion',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
import { SolicitudesEquiposPage } from '../app/pages/solicitudes-equipos/solicitudes-equipos.page';
