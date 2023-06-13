import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SolicitudesRecibidasJugadoresPage } from './solicitudes-recibidas-jugadores.page';

describe('SolicitudesRecibidasJugadoresPage', () => {
  let component: SolicitudesRecibidasJugadoresPage;
  let fixture: ComponentFixture<SolicitudesRecibidasJugadoresPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesRecibidasJugadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudesRecibidasJugadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
