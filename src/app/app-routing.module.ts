import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio/inicio-sesion',
    pathMatch: 'full'
  },
  
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canLoad:[AutoLoginGuard]
  },



  {
    path: 'rivales',
    loadChildren: () => import('./pages/rivales/rivales.module').then( m => m.RivalesPageModule)
  },
  {
    path: 'clasificacion',
    loadChildren: () => import('./pages/clasificacion/clasificacion.module').then( m => m.ClasificacionPageModule)
  },




  {
    path: 'cancha-detalle',
    loadChildren: () => import('./pages/cancha-detalle/cancha-detalle.module').then( m => m.CanchaDetallePageModule)
  },




  {
    path: 'inicio-partido',
    loadChildren: () => import('./pages/inicio-partido/inicio-partido.module').then( m => m.InicioPartidoPageModule)
  },




 
  {
    path: 'lista-canchas',
    loadChildren: () => import('./pages/lista-canchas/lista-canchas.module').then( m => m.ListaCanchasPageModule)
  },
  {
    path: 'lista-equipos',
    loadChildren: () => import('./pages/lista-equipos/lista-equipos.module').then( m => m.ListaEquiposPageModule)
  },
 
  {
    path: 'equipo-detalle-modal',
    loadChildren: () => import('./pages/equipo-detalle-modal/equipo-detalle-modal.module').then( m => m.EquipoDetalleModalPageModule)
  },
 
  {
    path: 'aceptar-reto',
    loadChildren: () => import('./pages/aceptar-reto/aceptar-reto.module').then( m => m.AceptarRetoPageModule)
  },
  {
    path: 'evaluacion-jugador',
    loadChildren: () => import('./pages/evaluacion-jugador/evaluacion-jugador.module').then( m => m.EvaluacionJugadorPageModule)
  },
  {
    path: 'evaluacion-equipo',
    loadChildren: () => import('./pages/evaluacion-equipo/evaluacion-equipo.module').then( m => m.EvaluacionEquipoPageModule)
  },
  {
    path: 'solicitudes-equipos',
    loadChildren: () => import('./pages/solicitudes-equipos/solicitudes-equipos.module').then( m => m.SolicitudesEquiposPageModule)
  },
   {
    path: 'buscar-jugadores',
    loadChildren: () => import('./pages/buscar-jugadores/buscar-jugadores.module').then( m => m.BuscarJugadoresPageModule)
  },
  {
    path: 'buscar-equipos',
    loadChildren: () => import('./pages/buscar-equipos/buscar-equipos.module').then( m => m.BuscarEquiposPageModule)
  },
  {
    path: 'solicitudes-jugadores',
    loadChildren: () => import('./pages/solicitudes-jugadores/solicitudes-jugadores.module').then( m => m.SolicitudesJugadoresPageModule)
  },
  {
    path: 'editar-perfil-usuario',
    loadChildren: () => import('./pages/editar-perfil-usuario/editar-perfil-usuario.module').then( m => m.EditarPerfilUsuarioPageModule)
  },
  {
    path: 'editar-perfil-equipo',
    loadChildren: () => import('./pages/editar-perfil-equipo/editar-perfil-equipo.module').then( m => m.EditarPerfilEquipoPageModule)
  },
  {
    path: 'estadistica-equipo',
    loadChildren: () => import('./pages/estadistica-equipo/estadistica-equipo.module').then( m => m.EstadisticaEquipoPageModule)
  },
  {
    path: 'perfil-jugador',
    loadChildren: () => import('./pages/perfil-jugador/perfil-jugador.module').then( m => m.PerfilJugadorPageModule)
  },
  {
    path: 'filtro-ubicacion',
    loadChildren: () => import('./pages/filtro-ubicacion/filtro-ubicacion.module').then( m => m.FiltroUbicacionPageModule)
  },

  {
    path: 'filtro-cancha',
    loadChildren: () => import('./pages/filtro-cancha/filtro-cancha.module').then( m => m.FiltroCanchaPageModule)
  },


  {
    path: 'seleccionar-fecha',
    loadChildren: () => import('./pages/seleccionar-fecha/seleccionar-fecha.module').then( m => m.SeleccionarFechaPageModule)
  },


  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'sobre-nosotros',
    loadChildren: () => import('./pages/sobre-nosotros/sobre-nosotros.module').then( m => m.SobreNosotrosPageModule)
  },

  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./pages/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },

  {
    path: 'perfil-equipo',
    loadChildren: () => import('./pages/perfil-equipo/perfil-equipo.module').then( m => m.PerfilEquipoPageModule)
  },
  {
    path: 'crear-equipo',
    loadChildren: () => import('./pages/crear-equipo/crear-equipo.module').then( m => m.CrearEquipoPageModule)
  },
  {
    path: 'generar-reservacion',
    loadChildren: () => import('./pages/generar-reservacion/generar-reservacion.module').then( m => m.GenerarReservacionPageModule)
  },
  {
    path: 'futplay',
    loadChildren: () => import('./pages/futplay/futplay.module').then( m => m.FutplayPageModule), canLoad:[AutoLoginGuard]
  },
  {
    path: 'mis-equipos',
    loadChildren: () => import('./pages/mis-equipos/mis-equipos.module').then( m => m.MisEquiposPageModule)
  },
  {
    path: 'mis-reservaciones',
    loadChildren: () => import('./pages/mis-reservaciones/mis-reservaciones.module').then( m => m.MisReservacionesPageModule)
  },
  {
    path: 'gestor-contrasena',
    loadChildren: () => import('./pages/gestor-contrasena/gestor-contrasena.module').then( m => m.GestorContrasenaPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'verificacion-qr',
    loadChildren: () => import('./pages/verificacion-qr/verificacion-qr.module').then( m => m.VerificacionQrPageModule)
  },
  {
    path: 'canchas',
    loadChildren: () => import('./pages/canchas/canchas.module').then( m => m.CanchasPageModule)
  },
  {
    path: 'video-screen',
    loadChildren: () => import('./pages/video-screen/video-screen.module').then( m => m.VideoScreenPageModule)
  },
  {
    path: 'crear-unirse-equipo',
    loadChildren: () => import('./pages/crear-unirse-equipo/crear-unirse-equipo.module').then( m => m.CrearUnirseEquipoPageModule)
  },
  {
    path: 'eliminar-cuenta',
    loadChildren: () => import('./pages/eliminar-cuenta/eliminar-cuenta.module').then( m => m.EliminarCuentaPageModule)
  },
  {
    path: 'eliminar-equipo',
    loadChildren: () => import('./pages/eliminar-equipo/eliminar-equipo.module').then( m => m.EliminarEquipoPageModule)
  },
  {
    path: 'eliminar-reto',
    loadChildren: () => import('./pages/eliminar-reto/eliminar-reto.module').then( m => m.EliminarRetoPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'filtro-usuarios',
    loadChildren: () => import('./pages/filtro-usuarios/filtro-usuarios.module').then( m => m.FiltroUsuariosPageModule)
  },
  {
    path: 'gestor-perfil-imagenes',
    loadChildren: () => import('./pages/gestor-perfil-imagenes/gestor-perfil-imagenes.module').then( m => m.GestorPerfilImagenesPageModule)
  },
  {
    path: 'gestor-equipo-imagenes',
    loadChildren: () => import('./pages/gestor-equipo-imagenes/gestor-equipo-imagenes.module').then( m => m.GestorEquipoImagenesPageModule)
  },  {
    path: 'efectuar-pago',
    loadChildren: () => import('./pages/efectuar-pago/efectuar-pago.module').then( m => m.EfectuarPagoPageModule)
  }

  



















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

