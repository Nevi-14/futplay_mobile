import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full',
  },
  {
    path: 'inicio-sesion',
    loadChildren: () =>
      import('./pages/inicio-sesion/inicio-sesion.module').then(
        (m) => m.InicioSesionPageModule
      ),
    canLoad: [AutoLoginGuard],
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'rivales',
    loadChildren: () =>
      import('./pages/rivales/rivales.module').then((m) => m.RivalesPageModule),
  },
  {
    path: 'cancha-detalle',
    loadChildren: () =>
      import('./pages/cancha-detalle/cancha-detalle.module').then(
        (m) => m.CanchaDetallePageModule
      ),
  },
  {
    path: 'inicio-partido',
    loadChildren: () =>
      import('./pages/inicio-partido/inicio-partido.module').then(
        (m) => m.InicioPartidoPageModule
      ),
  },
  {
    path: 'lista-equipos',
    loadChildren: () =>
      import('./pages/lista-equipos/lista-equipos.module').then(
        (m) => m.ListaEquiposPageModule
      ),
  },
  {
    path: 'equipo-detalle-modal',
    loadChildren: () =>
      import('./pages/equipo-detalle-modal/equipo-detalle-modal.module').then(
        (m) => m.EquipoDetalleModalPageModule
      ),
  },
  {
    path: 'aceptar-reto',
    loadChildren: () =>
      import('./pages/aceptar-reto/aceptar-reto.module').then(
        (m) => m.AceptarRetoPageModule
      ),
  },
  {
    path: 'evaluacion-jugador',
    loadChildren: () =>
      import('./pages/evaluacion-jugador/evaluacion-jugador.module').then(
        (m) => m.EvaluacionJugadorPageModule
      ),
  },
  {
    path: 'evaluacion-equipo',
    loadChildren: () =>
      import('./pages/evaluacion-equipo/evaluacion-equipo.module').then(
        (m) => m.EvaluacionEquipoPageModule
      ),
  },
  {
    path: 'buscar-jugadores',
    loadChildren: () =>
      import('./pages/buscar-jugadores/buscar-jugadores.module').then(
        (m) => m.BuscarJugadoresPageModule
      ),
  },
  {
    path: 'buscar-equipos',
    loadChildren: () =>
      import('./pages/buscar-equipos/buscar-equipos.module').then(
        (m) => m.BuscarEquiposPageModule
      ),
  },
  {
    path: 'editar-perfil-usuario',
    loadChildren: () =>
      import('./pages/editar-perfil-usuario/editar-perfil-usuario.module').then(
        (m) => m.EditarPerfilUsuarioPageModule
      ),
  },
  {
    path: 'editar-perfil-equipo',
    loadChildren: () =>
      import('./pages/editar-perfil-equipo/editar-perfil-equipo.module').then(
        (m) => m.EditarPerfilEquipoPageModule
      ),
  },
  {
    path: 'estadistica-equipo',
    loadChildren: () =>
      import('./pages/estadistica-equipo/estadistica-equipo.module').then(
        (m) => m.EstadisticaEquipoPageModule
      ),
  },
  {
    path: 'perfil-jugador',
    loadChildren: () =>
      import('./pages/perfil-jugador/perfil-jugador.module').then(
        (m) => m.PerfilJugadorPageModule
      ),
  },
  {
    path: 'filtro-ubicacion',
    loadChildren: () =>
      import('./pages/filtro-ubicacion/filtro-ubicacion.module').then(
        (m) => m.FiltroUbicacionPageModule
      ),
  },
  {
    path: 'filtro-cancha',
    loadChildren: () =>
      import('./pages/filtro-cancha/filtro-cancha.module').then(
        (m) => m.FiltroCanchaPageModule
      ),
  },
  {
    path: 'seleccionar-fecha',
    loadChildren: () =>
      import('./pages/seleccionar-fecha/seleccionar-fecha.module').then(
        (m) => m.SeleccionarFechaPageModule
      ),
  },
  {
    path: 'crear-equipo',
    loadChildren: () =>
      import('./pages/crear-equipo/crear-equipo.module').then(
        (m) => m.CrearEquipoPageModule
      ),
  },
  {
    path: 'generar-reservacion',
    loadChildren: () =>
      import('./pages/generar-reservacion/generar-reservacion.module').then(
        (m) => m.GenerarReservacionPageModule
      ),
  },
  {
    path: 'futplay',
    loadChildren: () =>
      import('./pages/futplay/futplay.module').then((m) => m.FutplayPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: 'mis-equipos',
    loadChildren: () =>
      import('./pages/mis-equipos/mis-equipos.module').then(
        (m) => m.MisEquiposPageModule
      ),
  },
  {
    path: 'gestor-contrasena',
    loadChildren: () =>
      import('./pages/gestor-contrasena/gestor-contrasena.module').then(
        (m) => m.GestorContrasenaPageModule
      ),
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () =>
      import('./pages/recuperar-contrasena/recuperar-contrasena.module').then(
        (m) => m.RecuperarContrasenaPageModule
      ),
  },
  {
    path: 'canchas',
    loadChildren: () =>
      import('./pages/canchas/canchas.module').then((m) => m.CanchasPageModule),
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () =>
      import('./pages/cambiar-contrasena/cambiar-contrasena.module').then(
        (m) => m.CambiarContrasenaPageModule
      ),
  },
  {
    path: 'filtro-usuarios',
    loadChildren: () =>
      import('./pages/filtro-usuarios/filtro-usuarios.module').then(
        (m) => m.FiltroUsuariosPageModule
      ),
  },
  {
    path: 'solicitudes-jugadores',
    loadChildren: () =>
      import('./pages/solicitudes-jugadores/solicitudes-jugadores.module').then(
        (m) => m.SolicitudesJugadoresPageModule
      ),
  },
  {
    path: 'transferencias',
    loadChildren: () =>
      import('./pages/transferencias/transferencias.module').then(
        (m) => m.TransferenciasPageModule
      ),
  },
  {
    path: 'finalizar-reservacion',
    loadChildren: () =>
      import('./pages/finalizar-reservacion/finalizar-reservacion.module').then(
        (m) => m.FinalizarReservacionPageModule
      ),
  },
  {
    path: 'gestion-retos',
    loadChildren: () =>
      import('./pages/gestion-retos/gestion-retos.module').then(
        (m) => m.GestionRetosPageModule
      ),
  },
  {
    path: 'aceptar-reto-abierto',
    loadChildren: () =>
      import('./pages/aceptar-reto-abierto/aceptar-reto-abierto.module').then(
        (m) => m.AceptarRetoAbiertoPageModule
      ),
  },

  {
    path: 'usuario-geolocalizacion',
    loadChildren: () =>
      import(
        './pages/usuario-geolocalizacion/usuario-geolocalizacion.module'
      ).then((m) => m.UsuarioGeolocalizacionPageModule),
  },
  {
    path: 'equipo-geolocalizacion',
    loadChildren: () =>
      import(
        './pages/equipo-geolocalizacion/equipo-geolocalizacion.module'
      ).then((m) => m.EquipoGeolocalizacionPageModule),
  },
  {
    path: 'contactar-desarollador',
    loadChildren: () =>
      import(
        './pages/contactar-desarollador/contactar-desarollador.module'
      ).then((m) => m.ContactarDesarolladorPageModule),
  },
  {
    path: 'historial-retos',
    loadChildren: () => import('./pages/historial-retos/historial-retos.module').then( m => m.HistorialRetosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}