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
    path: 'transferencias',
    loadChildren: () => import('./pages/transferencias/transferencias.module').then( m => m.TransferenciasPageModule)
  },
  {
    path: 'create-club',
    loadChildren: () => import('./pages/create-club/create-club.module').then( m => m.CreateClubPageModule)
  },
  {
    path: 'join-club',
    loadChildren: () => import('./pages/join-club/join-club.module').then( m => m.JoinClubPageModule)
  },
  {
    path: 'club-info',
    loadChildren: () => import('./pages/club-info/club-info.module').then( m => m.ClubInfoPageModule)
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
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'club-profile-info',
    loadChildren: () => import('./pages/club-profile-info/club-profile-info.module').then( m => m.ClubProfileInfoPageModule)
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
    path: 'new-reservation',
    loadChildren: () => import('./pages/new-reservation/new-reservation.module').then( m => m.NewReservationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

