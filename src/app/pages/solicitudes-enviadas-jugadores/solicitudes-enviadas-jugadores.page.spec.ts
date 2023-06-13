import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SolicitudesEnviadasJugadoresPage } from './solicitudes-enviadas-jugadores.page';

describe('SolicitudesEnviadasJugadoresPage', () => {
  let component: SolicitudesEnviadasJugadoresPage;
  let fixture: ComponentFixture<SolicitudesEnviadasJugadoresPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesEnviadasJugadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudesEnviadasJugadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
