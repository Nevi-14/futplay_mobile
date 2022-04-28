import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'clubs',
    loadChildren: () => import('./pages/clubs/clubs.module').then( m => m.ClubsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import('./pages/reservations/reservations.module').then( m => m.ReservationsPageModule)
  },

  {
    path: 'create-club',
    loadChildren: () => import('./pages/create-club/create-club.module').then( m => m.CreateClubPageModule)
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
    path: 'my-clubs',
    loadChildren: () => import('./pages/my-clubs/my-clubs.module').then( m => m.MyClubsPageModule)
  },
  {
    path: 'my-reservations',
    loadChildren: () => import('./pages/my-reservations/my-reservations.module').then( m => m.MyReservationsPageModule)
  },

  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },
 
  {
    path: 'payment-method',
    loadChildren: () => import('./pages/payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  },


  {
    path: 'cancha-detalle',
    loadChildren: () => import('./pages/cancha-detalle/cancha-detalle.module').then( m => m.CanchaDetallePageModule)
  },

  {
    path: 'canchas',
    loadChildren: () => import('./pages/canchas/canchas.module').then( m => m.CanchasPageModule)
  },


  {
    path: 'inicio-partido',
    loadChildren: () => import('./pages/inicio-partido/inicio-partido.module').then( m => m.InicioPartidoPageModule)
  },



  {
    path: 'qr-verification',
    loadChildren: () => import('./pages/qr-verification/qr-verification.module').then( m => m.QrVerificationPageModule)
  },

{
    path: 'generar-reservacion',
    loadChildren: () => import('./pages/generar-reservacion/generar-reservacion.module').then( m => m.GenerarReservacionPageModule)
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
    path: 'equipo-reservacion',
    loadChildren: () => import('./pages/equipo-reservacion/equipo-reservacion.module').then( m => m.EquipoReservacionPageModule)
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
    path: 'solicitudes-rechazadas',
    loadChildren: () => import('./pages/solicitudes-rechazadas/solicitudes-rechazadas.module').then( m => m.SolicitudesRechazadasPageModule)
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
    path: 'filtro-equipo',
    loadChildren: () => import('./pages/filtro-equipo/filtro-equipo.module').then( m => m.FiltroEquipoPageModule)
  },
  {
    path: 'filtro-jugador',
    loadChildren: () => import('./pages/filtro-jugador/filtro-jugador.module').then( m => m.FiltroJugadorPageModule)
  },
  {
    path: 'filtro-cancha',
    loadChildren: () => import('./pages/filtro-cancha/filtro-cancha.module').then( m => m.FiltroCanchaPageModule)
  },


  {
    path: 'seleccionar-fecha',
    loadChildren: () => import('./pages/seleccionar-fecha/seleccionar-fecha.module').then( m => m.SeleccionarFechaPageModule)
  },


 










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

